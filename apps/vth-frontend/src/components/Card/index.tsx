import { Heading2, Paragraph } from '@utrecht/component-library-react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, HTMLAttributes } from 'react';
import './index.style.css';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  alt: string;
  body: string;
  href: string;
  imgSrc: string;
  title: string;
}

export const Card: FC<CardProps> = ({ alt, body, href, imgSrc, title, ...props }) => {
  return (
    <div {...props} className={clsx('utrecht-card', props.className)}>
      <Image src={imgSrc} alt={alt} className={'utrecht-card__image'} width={312} height={200} />
      <div className={'utrecht-card__content'}>
        <Link href={href} className={'utrecht-link'}>
          <Heading2 className="utrecht-card__title">{title}</Heading2>
        </Link>
        <Paragraph className="utrecht-card__body">{body}</Paragraph>
      </div>
    </div>
  );
};
