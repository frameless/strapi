import classNames from 'classnames/bind';
import React, { ComponentType, ForwardedRef, forwardRef, PropsWithChildren } from 'react';
import styles from './index.module.scss';

const css = classNames.bind(styles);
interface ImageComponentProps
  extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

const ImageComponent = forwardRef(
  (
    { src, alt, width, height, ...props }: PropsWithChildren<ImageComponentProps>,
    ref: ForwardedRef<HTMLImageElement>,
  ) => <img ref={ref} src={src} height={height} width={width} alt={alt} {...props} />,
);

ImageComponent.displayName = 'Image';

export interface ImgProps
  extends Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'ref'> {
  Image?: ComponentType<any>;
  figure?: string;
}

export const Img = forwardRef(
  (
    { height, width, src, Image = ImageComponent, alt = '', figure, ...props }: PropsWithChildren<ImgProps>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    if (width && height && src) {
      const imgElement = (
        <Image
          src={src}
          width={width}
          height={height}
          ref={ref}
          alt={alt}
          className={css('utrecht-image')}
          {...props}
        />
      );
      if (figure) {
        return (
          <figure className={css('utrecht-figure')}>
            {imgElement}
            <figcaption className={css('utrecht-figure__figcaption')}>{figure}</figcaption>
          </figure>
        );
      }

      return imgElement;
    }

    return null;
  },
);

Img.displayName = 'Img';
