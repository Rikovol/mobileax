'use client';

import { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Check } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_PHONEBASE_API || '';
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID || '';
const RATE_LIMIT_MS = 60_000;
const STORAGE_KEY = 'mobileax_msg_last_sent_at';

/** Глобальный CustomEvent для открытия виджета с предзаполненными полями.
 *  Источник: кнопка «Купить» в карточке товара, любые другие триггеры.
 *  detail: { messageType?, subject?, body? } — все поля опциональны. */
export const MESSAGE_WIDGET_OPEN_EVENT = 'mobileax:open-message';
export interface OpenMessageDetail {
  messageType?: 'contact' | 'order' | 'feedback';
  subject?: string;
  body?: string;
}

export function openMessageWidget(detail: OpenMessageDetail = {}) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(MESSAGE_WIDGET_OPEN_EVENT, { detail }));
  }
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';
type MessageType = 'contact' | 'order' | 'feedback';

/**
 * Плавающая кнопка «Сообщения» — снизу справа на всех страницах.
 * Открывает модалку с формой контакта (имя, телефон, email, сообщение).
 * POST → phonebase /api/sites/{store_id}/messages с message_type='contact'.
 *
 * Анонимная (без OAuth — VK App ID и TG Bot Token пока не получены).
 * Защита: honeypot `website`, time_to_submit_ms ≥ 3000, rate-limit 60 сек.
 */
export default function MessageWidget() {
  const [open, setOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [honey, setHoney] = useState(''); // hidden honeypot, должно быть пусто
  const [messageType, setMessageType] = useState<MessageType>('contact');
  const [subject, setSubject] = useState<string>('');
  const openedAtRef = useRef<number>(0);

  useEffect(() => {
    if (open) openedAtRef.current = Date.now();
  }, [open]);

  // Подписываемся на CustomEvent от других компонентов (кнопка «Купить» и т.п.)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<OpenMessageDetail>).detail || {};
      setMessageType(detail.messageType || 'contact');
      setSubject(detail.subject || '');
      if (detail.body) setBody(detail.body);
      setSubmitState('idle');
      setErrorMsg('');
      setOpen(true);
    };
    window.addEventListener(MESSAGE_WIDGET_OPEN_EVENT, handler);
    return () => window.removeEventListener(MESSAGE_WIDGET_OPEN_EVENT, handler);
  }, []);

  // ESC закрывает модалку
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Запрет скролла body когда открыта модалка (только на мобиле)
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setSubmitState('idle');
    setErrorMsg('');
  };

  const reset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setBody('');
    setHoney('');
    setMessageType('contact');
    setSubject('');
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Rate limit
    if (typeof window !== 'undefined') {
      const last = Number(localStorage.getItem(STORAGE_KEY) || '0');
      const wait = RATE_LIMIT_MS - (Date.now() - last);
      if (wait > 0) {
        setErrorMsg(`Подождите ${Math.ceil(wait / 1000)} сек перед повторной отправкой.`);
        setSubmitState('error');
        return;
      }
    }

    if (!name.trim() || !phone.trim() || !body.trim()) {
      setErrorMsg('Заполните имя, телефон и сообщение.');
      setSubmitState('error');
      return;
    }

    if (!STORE_ID || !BASE_URL) {
      setErrorMsg('Сервис временно недоступен.');
      setSubmitState('error');
      return;
    }

    setSubmitState('loading');

    try {
      const res = await fetch(`${BASE_URL}/api/sites/${STORE_ID}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message_type: messageType,
          contact_name: name.trim(),
          contact_phone: phone.trim(),
          contact_email: email.trim() || undefined,
          subject: subject || (messageType === 'order' ? 'Заказ с сайта' : 'Сообщение с сайта'),
          body: body.trim(),
          website: honey,
          time_to_submit_ms: Math.max(0, Date.now() - openedAtRef.current),
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Ошибка ${res.status}${text ? `: ${text.slice(0, 120)}` : ''}`);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      }
      setSubmitState('success');
      // Через 4 сек автозакрытие + сброс полей
      setTimeout(() => {
        close();
        reset();
      }, 4000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Не удалось отправить сообщение';
      setErrorMsg(msg);
      setSubmitState('error');
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Написать сообщение"
        className="msg-fab fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[90] flex items-center justify-center w-14 h-14 rounded-full text-white transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
          boxShadow: '0 10px 28px rgba(0, 120, 255, 0.45), 0 4px 8px rgba(0, 0, 0, 0.10)',
        }}
      >
        <MessageCircle size={22} strokeWidth={2.2} />
      </button>

      {/* Modal */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-[100]"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
            onClick={close}
            aria-hidden
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="msg-widget-title"
            className="fixed bottom-0 right-0 left-0 md:left-auto md:bottom-6 md:right-6 md:w-[420px] z-[101] bg-white shadow-2xl overflow-hidden flex flex-col"
            style={{
              maxHeight: '92vh',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            {/* Заголовок */}
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <h2
                id="msg-widget-title"
                className="font-semibold tracking-tight"
                style={{ fontSize: 17, color: 'var(--color-text)' }}
              >
                {messageType === 'order' ? 'Оформить заказ' : 'Связаться с нами'}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Закрыть"
                className="p-1.5 -mr-1 rounded-full transition-colors"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Контент */}
            {submitState === 'success' ? (
              <div className="p-8 text-center" style={{ color: 'var(--color-text)' }}>
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#16a34a' }}
                >
                  <Check size={32} strokeWidth={2.5} />
                </div>
                <h3 className="font-semibold text-lg mb-2">Спасибо!</h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Мы получили ваше сообщение и свяжемся с вами в ближайшее время.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="p-5 space-y-3 overflow-y-auto"
                style={{ flex: 1 }}
              >
                {messageType === 'order' && subject && (
                  <div
                    className="rounded-lg p-3 text-sm flex items-center gap-2"
                    style={{
                      background: 'rgba(0, 113, 227, 0.08)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    <span>🛒</span>
                    <span className="font-medium">{subject}</span>
                  </div>
                )}
                <div>
                  <label className="block text-[13px] font-medium mb-1" style={{ color: 'var(--color-text)' }}>
                    Имя <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-lg text-sm border focus:outline-none transition-colors"
                    style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}
                    placeholder="Иван"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium mb-1" style={{ color: 'var(--color-text)' }}>
                    Телефон <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-lg text-sm border"
                    style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}
                    placeholder="+7 ___ ___ __ __"
                  />
                </div>
                <div>
                  <label
                    className="block text-[13px] font-medium mb-1"
                    style={{ color: 'var(--color-text)' }}
                  >
                    Email{' '}
                    <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}>
                      — необязательно
                    </span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg text-sm border"
                    style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium mb-1" style={{ color: 'var(--color-text)' }}>
                    Сообщение <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    rows={3}
                    minLength={3}
                    className="w-full px-3 py-2.5 rounded-lg text-sm border resize-y"
                    style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}
                    placeholder="Расскажите, чем мы можем помочь"
                  />
                </div>

                {/* Honeypot — скрыт от человека, но виден ботам */}
                <input
                  type="text"
                  name="website"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    opacity: 0,
                    pointerEvents: 'none',
                  }}
                />

                {submitState === 'error' && errorMsg && (
                  <div
                    className="text-sm rounded-lg p-2.5"
                    style={{ background: 'rgba(220, 38, 38, 0.08)', color: '#b91c1c' }}
                  >
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitState === 'loading'}
                  className="w-full py-3 rounded-full text-white font-semibold disabled:opacity-60 transition-transform hover:translate-y-[-1px]"
                  style={{
                    background: 'linear-gradient(135deg, #0066ff 0%, #00b4ff 100%)',
                    boxShadow: '0 6px 16px rgba(0, 120, 255, 0.35)',
                  }}
                >
                  {submitState === 'loading' ? 'Отправка...' : 'Отправить'}
                </button>

                <p
                  className="text-[11px] text-center pt-1"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Нажимая «Отправить», вы соглашаетесь с{' '}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    обработкой персональных данных
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </>
      )}
    </>
  );
}
