import { NodeViewWrapper } from '@tiptap/react';
import type { NodeViewWrapperProps } from '@tiptap/react';
import React, { forwardRef, useContext } from 'react';
import type { ForwardedRef, PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';
import ProductPriceContext from '../../../context/productPrice/context';
import { formatCurrency, getTrad, isFreeProduct } from '../../../utils';

interface PriceWidgetProps {
  node: {
    attrs: {
      'data-strapi-idref': string;
    };
  };
}

interface PriceWidgetWrapperProps extends NodeViewWrapperProps {}

const PriceWidgetWrapper = forwardRef(
  ({ children }: PropsWithChildren<PriceWidgetWrapperProps>, ref: ForwardedRef<NodeViewWrapperProps>) => (
    <NodeViewWrapper ref={ref} className="utrecht-price-widget" contentEditable={false}>
      <span draggable contentEditable={false} data-drag-handle="">
        {children}
      </span>
    </NodeViewWrapper>
  ),
);

PriceWidgetWrapper.displayName = 'PriceWidgetWrapper';

export default function PriceWidget({ node: { attrs } }: PriceWidgetProps) {
  const { busy, productPrice } = useContext(ProductPriceContext);
  const price = productPrice?.price?.find((price) => price?.uuid === attrs['data-strapi-idref']);

  const { formatMessage } = useIntl();

  if (busy) return null;
  if (!price)
    return (
      <PriceWidgetWrapper>
        {formatMessage({
          id: getTrad('components.priceWidget.priceUnknown'),
          defaultMessage: '€\u00A0#,##0\u00A0(price\u00A0unknown)',
        })}
      </PriceWidgetWrapper>
    );
  return (
    <PriceWidgetWrapper>
      {isFreeProduct(price.value)
        ? formatMessage({ id: getTrad('common.words.freeProduct'), defaultMessage: 'free' })
        : formatCurrency(price)}
    </PriceWidgetWrapper>
  );
}
