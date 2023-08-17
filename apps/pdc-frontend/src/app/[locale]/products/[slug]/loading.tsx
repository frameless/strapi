import Skeleton from 'react-loading-skeleton';

import './loading.style.css';

export default function Loading() {
  return (
    <div className="utrecht-page-loading">
      <div className="utrecht-page-loading__title">
        <Skeleton className="utrecht-page-skeleton__title-item" />
      </div>
      <div className="utrecht-page-loading__body">
        <Skeleton containerClassName="utrecht-page-loading__body-item" />
      </div>
    </div>
  );
}
