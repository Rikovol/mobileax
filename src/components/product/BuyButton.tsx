'use client';

import { openMessageWidget } from '@/components/messages/MessageWidget';

interface Props {
  productLabel: string;
  priceLabel?: string;
  /** Дополнительные характеристики, попадут в текст заказа. */
  specs?: {
    storage?: string | null;
    color?: string | null;
    sim?: string | null;
    condition?: 'new' | 'used' | null;
    batteryPct?: string | null;
    completeness?: string | null;
  };
}

/**
 * Клиентская кнопка «Купить» в карточке товара.
 * Открывает MessageWidget с message_type='order', requireAuth=true и
 * предзаполненным body со всеми характеристиками. Заявка падает в
 * Магазин > Заказы (синий чип) на стороне phonebase.
 */
export default function BuyButton({ productLabel, priceLabel, specs }: Props) {
  const onClick = () => {
    const lines: string[] = [`Заказ: ${productLabel}`];
    if (priceLabel) lines.push(`Цена: ${priceLabel}`);
    if (specs) {
      if (specs.storage) lines.push(`Память: ${specs.storage}`);
      if (specs.color) lines.push(`Цвет: ${specs.color}`);
      if (specs.sim) lines.push(`SIM: ${specs.sim}`);
      if (specs.condition) {
        lines.push(`Состояние: ${specs.condition === 'used' ? 'Б/у' : 'Новое'}`);
      }
      if (specs.batteryPct) lines.push(`Батарея: ${specs.batteryPct}`);
      if (specs.completeness) lines.push(`Комплект: ${specs.completeness}`);
    }
    lines.push('');
    lines.push('Прошу связаться со мной для оформления заказа.');

    openMessageWidget({
      messageType: 'order',
      subject: productLabel,
      body: lines.join('\n'),
      requireAuth: true,
    });
  };

  return (
    <button type="button" className="btn-accent flex-1" onClick={onClick}>
      Купить
    </button>
  );
}
