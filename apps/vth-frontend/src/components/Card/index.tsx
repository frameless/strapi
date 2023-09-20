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
  return (
    <div {...props} className={clsx('utrecht-card', props.className)}>
      {url && <Image src={url} alt={alt} className={'utrecht-card__image'} width={312} height={200} />}
      <div className={'utrecht-card__content'}>
        <Link href={href} className={'utrecht-link'}>
          <Heading2 className="utrecht-card__title">{title}</Heading2>
        </Link>
        <Paragraph className="utrecht-card__body">{description}</Paragraph>
      </div>
    </div>
  );
};
