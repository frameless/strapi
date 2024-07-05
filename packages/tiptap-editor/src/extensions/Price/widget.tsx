import type { NodeViewWrapperProps } from '@tiptap/react';
import { NodeViewWrapper } from '@tiptap/react';
import classnames from 'classnames/bind';
import { forwardRef, useContext } from 'react';
import type { ForwardedRef, PropsWithChildren } from 'react';
import styles from './index.module.scss';
import priceContext from '../../context/price/context';
import { formatCurrency, isFreeProduct } from '../../utils';

const css = classnames.bind(styles);

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
    <NodeViewWrapper ref={ref} className={css('utrecht-price-widget')} contentEditable={false}>
      <span draggable contentEditable={false} data-drag-handle="">
        {children}
      </span>
    </NodeViewWrapper>
  ),
);

PriceWidgetWrapper.displayName = 'PriceWidgetWrapper';

const PriceWidget = ({ node: { attrs } }: PriceWidgetProps) => {
  const { data } = useContext(priceContext);
  const currentPrice = data?.price?.find((price) => price?.uuid === attrs['data-strapi-idref']);

  if (currentPrice && currentPrice.value)
    return (
      <PriceWidgetWrapper>
        {/* {isFreeProduct(price.value)
        ? formatMessage({ id: 'common.words.freeProduct', defaultMessage: 'free' })
        : formatCurrency(price)} */}
        {isFreeProduct(currentPrice.value)
          ? 'free'
          : formatCurrency({ value: currentPrice.value, currency: currentPrice.currency })}
      </PriceWidgetWrapper>
    );
  return (
    <PriceWidgetWrapper>
      {/* {formatMessage({
        id: 'components.priceWidget.priceUnknown',
        defaultMessage: '€\u00A0#,##0\u00A0(price\u00A0unknown)',
      })} */}
      €#,##0 (price unknown)
    </PriceWidgetWrapper>
  );
};
export default PriceWidget;
