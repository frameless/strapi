import { NodeViewWrapper } from '@tiptap/react';
import React from 'react';
import ProductPriceContext from '../../../context/productPrice/context';
import { formatCurrency } from '../../../utils/formateCurrency';

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

  if (busy) return null;

  return (
    <NodeViewWrapper className="utrecht-price-widget" as="span" contentEditable={false}>
      <span draggable contentEditable={false} data-drag-handle="" id={price?.id}>
        {formatCurrency(price)}
      </span>
    </NodeViewWrapper>
  );
}
