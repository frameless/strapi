import { NodeViewWrapper } from '@tiptap/react';
import React from 'react';
import { useIntl } from 'react-intl';
import ProductPriceContext from '../../../context/productPrice/context';
import { getPriceValue } from '../../../utils';

interface PriceWidgetProps {
  node: {
    attrs: {
      'data-strapi-idref': string;
    };
  };
}

export default function PriceWidget({ node: { attrs } }: PriceWidgetProps) {
  const { busy, productPrice } = React.useContext(ProductPriceContext);
  const price = productPrice?.price?.find((price) => {
    const currentPrice = price?.id === attrs['data-strapi-idref'].toString();
    return currentPrice;
  });

  const { formatMessage } = useIntl();

  if (busy) return null;
  return price ? (
    <NodeViewWrapper className="utrecht-price-widget" contentEditable={false}>
      <span draggable contentEditable={false} data-drag-handle="" id={price?.id}>
        {formatMessage({ id: getPriceValue(price, 'common.words.freeProduct') })}
      </span>
    </NodeViewWrapper>
  ) : null;
}
