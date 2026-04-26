import type { Metadata } from 'next';
import Link from 'next/link';
import { LEGAL } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — МобилАкс',
  description: 'Политика обработки персональных данных МобилАкс (152-ФЗ).',
  alternates: { canonical: 'https://xn--80abvjddo3a.xn--p1ai/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="section-container section-gap" style={{ maxWidth: 880 }}>
      <nav className="text-sm text-[var(--color-text-secondary)] mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">Политика конфиденциальности</span>
      </nav>

      <h1 className="hero-title mb-4">Политика конфиденциальности</h1>
      <p className="text-[14px] mb-10" style={{ color: 'var(--color-text-secondary)' }}>
        Дата вступления в силу: 1 января 2026 г.
      </p>

      <article
        className="prose-mobileax space-y-5"
        style={{ color: 'var(--color-text)', fontSize: '15px', lineHeight: 1.65 }}
      >
        <p>
          Настоящая Политика обработки персональных данных (далее — «Политика») разработана
          в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» от 27.07.2006
          и определяет порядок обработки персональных данных Оператором: <strong>{LEGAL.fullName}</strong>,
          ОГРНИП {LEGAL.ogrnip}, ИНН {LEGAL.inn}, адрес: {LEGAL.actualAddress}.
        </p>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">1. Категории субъектов и данных</h2>
        <p>
          Оператор обрабатывает персональные данные посетителей сайта и клиентов магазина МобилАкс:
          фамилия, имя, отчество, номер мобильного телефона, адрес электронной почты, IMEI/серийный
          номер устройства (для Trade-In), история обращений и покупок, файлы cookie, IP-адрес,
          данные браузера и устройства.
        </p>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">2. Цели обработки</h2>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>оформление заказов и доставка товаров;</li>
          <li>проведение Trade-In — оценка и обмен старого устройства;</li>
          <li>оформление рассрочки и гарантийного обслуживания;</li>
          <li>обратная связь по обращениям клиентов;</li>
          <li>информирование о статусе заказа, акциях, поступлениях (с явного согласия);</li>
          <li>аналитика посещаемости сайта (Яндекс.Метрика).</li>
        </ul>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">3. Правовые основания</h2>
        <p>
          Согласие субъекта персональных данных, договор купли-продажи, Trade-In или гарантии,
          а также требования законодательства РФ (242-ФЗ — локализация хранения, 38-ФЗ — реклама).
        </p>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">4. Хранение и защита</h2>
        <p>
          Персональные данные хранятся на серверах, расположенных на территории Российской Федерации
          (242-ФЗ). Срок хранения — не более 5 лет с момента последнего взаимодействия, кроме случаев,
          когда более длительный срок предусмотрен законом. Оператор применяет технические
          и организационные меры защиты: шифрование при передаче (HTTPS), ограничение доступа
          сотрудников, журналирование операций.
        </p>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">5. Передача третьим лицам</h2>
        <p>
          Оператор не передаёт персональные данные третьим лицам, за исключением:
          курьерских и транспортных компаний для доставки; партнёрских банков для оформления
          рассрочки (только с согласия клиента); налоговых и правоохранительных органов
          в случаях, предусмотренных законом.
        </p>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">6. Файлы cookie и аналитика</h2>
        <p>
          Сайт использует файлы cookie для базовой работы, а также сервис Яндекс.Метрика
          для статистики посещений. Отключить cookie можно в настройках браузера —
          часть функциональности сайта может стать недоступна.
        </p>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">7. Права субъекта</h2>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>получить информацию об обработке своих данных;</li>
          <li>требовать уточнения, блокирования или удаления данных;</li>
          <li>отозвать согласие на обработку;</li>
          <li>обжаловать действия Оператора в Роскомнадзор.</li>
        </ul>
        <p>
          Запросы направляйте на {LEGAL.email} с темой «Персональные данные» —
          ответ в течение 30 календарных дней.
        </p>

        <h2 className="font-semibold text-[20px] mt-8 mb-2">8. Контакты Оператора</h2>
        <p>
          {LEGAL.fullName}<br />
          ОГРНИП: {LEGAL.ogrnip}<br />
          ИНН: {LEGAL.inn}<br />
          Дата регистрации ИП: {LEGAL.registrationDate}<br />
          Налоговый орган: {LEGAL.taxAuthority}<br />
          Адрес: {LEGAL.actualAddress}<br />
          Телефон: {LEGAL.phone}<br />
          Email: {LEGAL.email}
        </p>
      </article>
    </div>
  );
}
