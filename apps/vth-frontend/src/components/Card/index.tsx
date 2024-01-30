'use client';

import classnames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, HTMLAttributes } from 'react';
import { Heading2, Paragraph } from '@/components';
import styles from './index.module.scss';

const css = classnames.bind(styles);

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  title: string;
  description: string;
  image: {
    url: string;
    alt: string;
  };
  link: {
    href: string;
  };
}

export const Card: FC<CardProps> = ({ description, title, image: { url = '', alt }, link: { href }, ...props }) => {
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  return (
    <div {...props} className={css('utrecht-card', props.className)} onClick={() => linkRef.current?.click()}>
      {url && <Image src={url} alt={alt} className={css('utrecht-card__image')} width={312} height={200} />}
      <div className={css('utrecht-card__content')}>
        <Heading2 className={css('utrecht-card__title')}>
          <Link ref={linkRef} href={href} className={css('utrecht-link utrecht-link--html-a')}>
            {title}
          </Link>
        </Heading2>
        <Paragraph className={css('utrecht-card__body')}>{description}</Paragraph>
      </div>
    </div>
  );
};
