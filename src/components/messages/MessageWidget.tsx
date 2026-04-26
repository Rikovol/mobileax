'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { X, MessageCircle, Check, LogOut } from 'lucide-react';
import type { AuthStatusOut, VisitorMe } from '@/types/api';

const BASE_URL = process.env.NEXT_PUBLIC_PHONEBASE_API || '';
const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID || '';
const RATE_LIMIT_MS = 60_000;
const STORAGE_KEY = 'mobileax_msg_last_sent_at';
const USER_KEY = 'mobileax_msg_user';

/**
 * Маска российского мобильного: 7 (9XX) XXX-XX-XX или 8 (9XX) XXX-XX-XX.
 * Принимает любую строку с цифрами и форматирует под маску.
 */
function formatPhone(input: string): string {
  // Берём только цифры; первая 7 / 8 — код страны
  const digits = input.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  let prefix = digits[0];
  if (prefix !== '7' && prefix !== '8') {
    prefix = '7';
  }
  const rest = digits.slice(1, 11); // максимум 10 цифр после кода
  let out = prefix;
  if (rest.length > 0) out += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += ')';
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

/** Валиден ли номер: 11 цифр, начинается с 7 или 8, второй знак — 9. */
function isValidRuPhone(input: string): boolean {
  const digits = input.replace(/\D/g, '');
  return /^[78]9\d{9}$/.test(digits);
}

export const MESSAGE_WIDGET_OPEN_EVENT = 'mobileax:open-message';
export interface OpenMessageDetail {
  messageType?: 'contact' | 'order' | 'feedback';
  subject?: string;
  body?: string;
  /** Если true — модал откроется с обязательным шагом авторизации (для заказа). */
  requireAuth?: boolean;
}

export function openMessageWidget(detail: OpenMessageDetail = {}) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(MESSAGE_WIDGET_OPEN_EVENT, { detail }));
  }
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';
type MessageType = 'contact' | 'order' | 'feedback';

declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramAuthUser) => void;
  }
}

interface TelegramAuthUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export default function MessageWidget() {
  const [open, setOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [honey, setHoney] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('contact');
  const [subject, setSubject] = useState<string>('');
  const [requireAuth, setRequireAuth] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthStatusOut | null>(null);
  const [me, setMe] = useState<VisitorMe | null>(null);
  const [authBusy, setAuthBusy] = useState(false);
  const openedAtRef = useRef<number>(0);

  const refreshMe = useCallback(async () => {
    if (!BASE_URL || !STORE_ID) return;
    try {
      const res = await fetch(`${BASE_URL}/api/sites/${STORE_ID}/auth/me`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = (await res.json()) as VisitorMe;
        setMe(data);
        if (data.display_name) setName(data.display_name);
        if (data.contact_email) setEmail(data.contact_email);
        if (data.contact_phone) setPhone(data.contact_phone);
      } else {
        setMe(null);
      }
    } catch {
      setMe(null);
    }
  }, []);

  useEffect(() => {
    if (!BASE_URL || !STORE_ID) return;
    fetch(`${BASE_URL}/api/sites/${STORE_ID}/auth/status`)
      .then((r) => (r.ok ? (r.json() as Promise<AuthStatusOut>) : null))
      .then((s) => s && setAuthStatus(s))
      .catch(() => {});
    refreshMe();
  }, [refreshMe]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (!raw) return;
      const stored = JSON.parse(raw) as { name?: string; phone?: string; email?: string };
      if (stored.name && !name) setName(stored.name);
      if (stored.phone && !phone) setPhone(stored.phone);
      if (stored.email && !email) setEmail(stored.email);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (open) openedAtRef.current = Date.now();
  }, [open]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<OpenMessageDetail>).detail || {};
      setMessageType(detail.messageType || 'contact');
      setSubject(detail.subject || '');
      if (detail.body) setBody(detail.body);
      setRequireAuth(!!detail.requireAuth || detail.messageType === 'order');
      setSubmitState('idle');
      setErrorMsg('');
      setOpen(true);
      refreshMe();
    };
    window.addEventListener(MESSAGE_WIDGET_OPEN_EVENT, handler);
    return () => window.removeEventListener(MESSAGE_WIDGET_OPEN_EVENT, handler);
  }, [refreshMe]);

  // Telegram Login Widget callback (глобальная функция)
  useEffect(() => {
    window.onTelegramAuth = async (user) => {
      setAuthBusy(true);
      setErrorMsg('');
      try {
        const res = await fetch(`${BASE_URL}/api/sites/${STORE_ID}/auth/telegram/callback`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt.slice(0, 120));
        }
        await refreshMe();
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : 'Telegram auth failed');
      } finally {
        setAuthBusy(false);
      }
    };
    return () => {
      delete window.onTelegramAuth;
    };
  }, [refreshMe]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    setSubmitState('idle');
    setErrorMsg('');
  };

  const startVkAuth = () => {
    const url = `${BASE_URL}/api/sites/${STORE_ID}/auth/vk/start`;
    const popup = window.open(url, 'vk_auth', 'width=600,height=750');
    if (!popup) {
      window.location.href = url;
      return;
    }
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        refreshMe();
      }
    }, 500);
  };

  const logout = async () => {
    if (!BASE_URL || !STORE_ID) return;
    try {
      await fetch(`${BASE_URL}/api/sites/${STORE_ID}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      /* ignore */
    }
    setMe(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (requireAuth && !me) {
      setErrorMsg('Войдите через VK или Telegram, чтобы оформить заказ.');
      setSubmitState('error');
      return;
    }

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
    if (!isValidRuPhone(phone)) {
      setErrorMsg('Укажите номер в формате 7 (9XX) XXX-XX-XX или 8 (9XX) XXX-XX-XX.');
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
        credentials: 'include',
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
        try {
          localStorage.setItem(
            USER_KEY,
            JSON.stringify({
              name: name.trim(),
              phone: phone.trim(),
              email: email.trim() || undefined,
            }),
          );
        } catch {
          /* ignore */
        }
      }
      setSubmitState('success');
      setTimeout(() => {
        close();
        setBody('');
        setSubject('');
        setHoney('');
        setMessageType('contact');
        setRequireAuth(false);
      }, 4000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Не удалось отправить сообщение');
      setSubmitState('error');
    }
  };

  const showAuthBlock =
    !me && (authStatus?.vk_available || authStatus?.telegram_available);

  return (
    <>
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
            style={{ maxHeight: '92vh', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          >
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
                className="p-1.5 -mr-1 rounded-full"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <X size={20} />
              </button>
            </div>

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
              <form onSubmit={onSubmit} className="p-5 space-y-3 overflow-y-auto" style={{ flex: 1 }}>
                {messageType === 'order' && subject && (
                  <div
                    className="rounded-lg p-3 text-sm flex items-center gap-2"
                    style={{ background: 'rgba(0, 113, 227, 0.08)', color: 'var(--color-accent)' }}
                  >
                    <span>🛒</span>
                    <span className="font-medium">{subject}</span>
                  </div>
                )}

                {me && (
                  <div
                    className="flex items-center gap-3 rounded-lg p-3"
                    style={{ background: 'rgba(0, 0, 0, 0.04)' }}
                  >
                    {me.avatar_url ? (
                      <Image
                        src={me.avatar_url}
                        alt={me.display_name || 'avatar'}
                        width={36}
                        height={36}
                        unoptimized
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-semibold"
                        style={{ background: '#e5e7eb', color: '#6b7280' }}
                      >
                        {(me.display_name || '?').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                        {me.display_name || 'Пользователь'}
                      </div>
                      <div className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                        {me.auth_provider === 'vk' ? 'через VK ID' : 'через Telegram'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={logout}
                      className="text-[11px] flex items-center gap-1"
                      style={{ color: 'var(--color-text-secondary)' }}
                      aria-label="Выйти"
                    >
                      <LogOut size={12} /> Выйти
                    </button>
                  </div>
                )}

                {showAuthBlock && (
                  <div
                    className="rounded-lg p-3 space-y-2 text-sm"
                    style={{
                      background:
                        requireAuth && !me
                          ? 'rgba(0, 113, 227, 0.08)'
                          : 'rgba(0, 0, 0, 0.03)',
                      border:
                        requireAuth && !me
                          ? '1px solid rgba(0, 113, 227, 0.3)'
                          : '1px solid var(--color-border)',
                    }}
                  >
                    <div className="font-medium text-[13px]" style={{ color: 'var(--color-text)' }}>
                      {requireAuth
                        ? 'Войдите для оформления заказа'
                        : 'Войдите, чтобы мы знали, кто вы'}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {authStatus?.vk_available && (
                        <button
                          type="button"
                          onClick={startVkAuth}
                          disabled={authBusy}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-white font-medium text-[13px] disabled:opacity-50"
                          style={{ background: '#0077FF' }}
                        >
                          <span style={{ fontWeight: 800 }}>VK ID</span>
                        </button>
                      )}
                      {authStatus?.telegram_available && authStatus.telegram_bot_username && (
                        <TelegramLoginButton
                          botUsername={authStatus.telegram_bot_username}
                          disabled={authBusy}
                        />
                      )}
                    </div>
                    {!requireAuth && (
                      <div className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                        Или заполните форму ниже без авторизации.
                      </div>
                    )}
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
                    disabled={!!me}
                    className="w-full px-3 py-2.5 rounded-lg text-sm border disabled:opacity-70"
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
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    onPaste={(e) => {
                      e.preventDefault();
                      setPhone(formatPhone(e.clipboardData.getData('text')));
                    }}
                    required
                    className="w-full px-3 py-2.5 rounded-lg text-sm border"
                    style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}
                    placeholder="7 (9__) ___-__-__"
                    maxLength={18}
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium mb-1" style={{ color: 'var(--color-text)' }}>
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

                <input
                  type="text"
                  name="website"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
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
                  disabled={submitState === 'loading' || (requireAuth && !me)}
                  className="w-full py-3 rounded-full text-white font-semibold disabled:opacity-50 transition-transform hover:translate-y-[-1px]"
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

/** Telegram Login Widget — динамически инжектит официальный <script>.
 *  callback вызывает window.onTelegramAuth (см. useEffect выше). */
function TelegramLoginButton({
  botUsername,
  disabled,
}: {
  botUsername: string;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Очищаем старый widget при ре-mount (DOM-метод, не innerHTML)
    while (node.firstChild) node.removeChild(node.firstChild);
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', botUsername);
    script.setAttribute('data-size', 'medium');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    node.appendChild(script);
  }, [botUsername]);

  return (
    <div
      ref={ref}
      style={{ flex: 1, opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}
    />
  );
}
