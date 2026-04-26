'use client';

import { openMessageWidget } from '@/components/messages/MessageWidget';

interface Props {
  productLabel: string;
  priceLabel?: string;
}

/**
 * Клиентская кнопка «Купить» в карточке товара.
 * Открывает MessageWidget с message_type='order' и предзаполненным subject —
 * заявка падает в Магазин > Заказы (синий чип) на стороне phonebase.
 */
export default function BuyButton({ productLabel, priceLabel }: Props) {
  const onClick = () => {
    openMessageWidget({
      messageType: 'order',
      subject: productLabel,
      body: `Хочу заказать: ${productLabel}${priceLabel ? ` (${priceLabel})` : ''}`,
      requireAuth: true,
    });
  };

  return (
    <button type="button" className="btn-accent flex-1" onClick={onClick}>
      Купить
    </button>
  );
}
