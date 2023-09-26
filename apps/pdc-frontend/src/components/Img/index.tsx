import classNames from 'classnames/bind';
import Image from 'next/image';
import React from 'react';
import styles from './index.module.scss';

const css = classNames.bind(styles);

export interface ImgProps
  extends Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'ref'> {}
export const Img = (props: ImgProps & { 'data-figcaption'?: null }) => {
  const { height, width, src, alt, title } = props;

  if (width && height && src) {
    const imgElement = (
      <Image
        className={css('utrecht-img')}
        src={src}
        alt={alt || ''}
        title={title}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        width={width as number}
        height={height as number}
      />
    );

    if (props['data-figcaption']) {
      return (
        <figure className={css('utrecht-figure')}>
          {imgElement}
          <figcaption className={css('utrecht-figure__figcaption')}>{props['data-figcaption']}</figcaption>
        </figure>
      );
    }

    return imgElement;
  }

  return null;
};
