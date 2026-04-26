import type { Metadata } from 'next';
import Link from 'next/link';
import { LEGAL } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Публичная оферта — МобилАкс',
  description: 'Условия дистанционной продажи товаров магазина МобилАкс в Орле.',
  alternates: { canonical: 'https://xn--80abvjddo3a.xn--p1ai/oferta' },
  robots: { index: true, follow: true },
};

export default function OfertaPage() {
  return (
    <div className="section-container section-gap" style={{ maxWidth: 880 }}>
      <nav className="text-sm text-[var(--color-text-secondary)] mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Публичная оферта</span>
      </nav>

      <h1 className="hero-title mb-4">Публичная оферта</h1>
      <p className="text-[14px] mb-10" style={{ color: 'var(--color-text-secondary)' }}>
        Договор купли-продажи дистанционным способом.
      </p>

      <article
        className="prose-mobileax space-y-5"
        style={{ color: 'var(--color-text)', fontSize: '15px', lineHeight: 1.65 }}
      >
        <h2 className="font-semibold text-[20px] mt-2 mb-2">1. Стороны</h2>
        <p>
          <strong>Продавец</strong>: {LEGAL.fullName}, ОГРНИП {LEGAL.ogrnip}, ИНН {LEGAL.inn},
          адрес: {LEGAL.actualAddress}.
        </p>
        <p>
          <strong>Покупатель</strong>: дееспособное физическое лицо, оформившее заказ на сайте
          или в магазине, либо принявшее условия настоящей оферты иным способом.
        </p>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">2. Предмет</h2>
        <p>
          Продавец обязуется передать Покупателю в собственность товары, представленные
          в каталоге сайта мобилакс.рф, а Покупатель — оплатить и принять товар на условиях
          настоящей оферты, согласно ст. 437 ГК РФ.
        </p>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">3. Цена и порядок оплаты</h2>
        <p>
          Цена товара указана в рублях с учётом НДС. Доступные способы оплаты: наличные
          в магазине, банковская карта, рассрочка через банки-партнёры (на условиях соответствующего
          банка). При расчётах применяется онлайн-касса в соответствии с 54-ФЗ.
        </p>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">4. Доставка и самовывоз</h2>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Самовывоз: г. Орёл, ул. Автовокзальная, д. 1А, подземный переход, Пн–Вс 09:00–19:00.</li>
          <li>Доставка по Орлу — обсуждается с менеджером.</li>
          <li>Доставка по России — почтовыми и курьерскими службами от 5 000 ₽ бесплатно.</li>
        </ul>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">5. Гарантия и возврат</h2>
        <p>
          На новую технику распространяется официальная гарантия производителя (12 месяцев Apple,
          12-24 месяца Samsung). На б/у-технику — гарантия магазина 14 дней с момента покупки.
        </p>
        <p>
          В соответствии со ст. 26.1 Закона «О защите прав потребителей», Покупатель вправе
          отказаться от товара надлежащего качества в течение 7 дней после его получения, при
          условии сохранения товарного вида и потребительских свойств. Технически сложные товары
          (смартфоны, ноутбуки) не подлежат возврату как товар надлежащего качества согласно
          Постановлению Правительства РФ № 2463 от 31.12.2020.
        </p>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">6. Trade-In</h2>
        <p>
          Trade-In — обмен старого устройства на новое с доплатой. Оценка проводится в магазине
          в присутствии клиента. Старое устройство принимается при условии: совпадение IMEI/серийного
          номера, работоспособность основных функций, отсутствие блокировок и потерянных аккаунтов
          (Apple ID / Samsung Account).
        </p>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">7. Ответственность</h2>
        <p>
          Продавец не отвечает за нарушения, вызванные действиями третьих лиц, обстоятельствами
          непреодолимой силы (форс-мажор), нарушением Покупателем правил эксплуатации товара.
        </p>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">8. Персональные данные</h2>
        <p>
          Обработка персональных данных Покупателя осуществляется в соответствии
          с <Link href="/privacy" style={{ color: 'var(--color-accent)' }}>Политикой конфиденциальности</Link> и 152-ФЗ.
        </p>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">9. Реквизиты Продавца</h2>
        <p>
          {LEGAL.fullName}<br />
          ОГРНИП: {LEGAL.ogrnip}<br />
          ИНН: {LEGAL.inn}<br />
          Дата регистрации ИП: {LEGAL.registrationDate}<br />
          Налоговый орган: {LEGAL.taxAuthority}<br />
          ОКПО: {LEGAL.okpo}<br />
          Адрес: {LEGAL.actualAddress}<br />
          Телефон: {LEGAL.phone}<br />
          Email: {LEGAL.email}
        </p>
      </article>
    </div>
  );
}
