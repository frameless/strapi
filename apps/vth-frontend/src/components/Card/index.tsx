'use client';

import { Heading2, Paragraph } from '@utrecht/component-library-react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, HTMLAttributes } from 'react';
import './index.style.css';

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
    <div {...props} className={clsx('utrecht-card', props.className)} onClick={() => linkRef.current?.click()}>
      {url && <Image src={url} alt={alt} className={'utrecht-card__image'} width={312} height={200} />}
      <div className={'utrecht-card__content'}>
        <Heading2 className="utrecht-card__title">
          <Link ref={linkRef} href={href} className={'utrecht-link utrecht-link--html-a'}>
            {title}
          </Link>
        </Heading2>
        <Paragraph className="utrecht-card__body">{description}</Paragraph>
      </div>
    </div>
  );
};
