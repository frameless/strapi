import Skeleton from 'react-loading-skeleton';
import './index.scss';

export default function ProductItem({ items }: { items: number }) {
  const createItems = Array(items).fill(1);

  return (
    <div className="utrecht-skeleton-product-item">
      {createItems.map((_item, index) => (
        <div key={index} className="utrecht-skeleton-product-item__item">
          <Skeleton width="100%" height="23px" className="utrecht-skeleton-product-item__item-skeleton" />
          <Skeleton width="100%" height="100px" />
        </div>
      ))}
    </div>
  );
}
