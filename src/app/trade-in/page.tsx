import type { Metadata } from 'next';
import { fetchTradeInPrices } from '@/lib/phonebase-client';
import { TradeinWizard } from '@/components/tradein/TradeinWizard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Trade-in — сдай старый смартфон',
  description: 'Оценка стоимости вашего смартфона онлайн. Быстро, честно, без обязательств.',
};

export default async function TradeInPage() {
  const prices = await fetchTradeInPrices();

  return (
    <div className="section-container section-gap">
      <div className="mb-10 text-center">
        <h1 className="hero-title mb-4">Trade-in</h1>
        <p className="hero-subtitle">
          Узнайте стоимость вашего смартфона за пару минут.
        </p>
      </div>
      <TradeinWizard initialPrices={prices} />
    </div>
  );
}
