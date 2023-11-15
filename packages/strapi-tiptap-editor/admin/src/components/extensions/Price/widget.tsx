import { NodeViewWrapper } from '@tiptap/react';
import React from 'react';
import { useIntl } from 'react-intl';
import ProductPriceContext from '../../../context/productPrice/context';
import { getPriceValue } from '../../../utils';

interface Props {
  node: {
    attrs: {
      id: string;
    };
  };
}

export default function Widget(props: Props) {
  const { busy, productPrice } = React.useContext(ProductPriceContext);
  const price = productPrice && productPrice.price?.find((price) => Number(price?.id) === Number(props.node.attrs.id));
  const { formatMessage } = useIntl();

  if (busy) return null;
  return price ? (
    <NodeViewWrapper className="utrecht-price-widget" as="span" contentEditable={false}>
      <span draggable contentEditable={false} data-drag-handle="" id={price?.id}>
        {formatMessage({ id: getPriceValue(price, 'common.words.freeProduct') })}
      </span>
    </NodeViewWrapper>
  ) : null;
}
