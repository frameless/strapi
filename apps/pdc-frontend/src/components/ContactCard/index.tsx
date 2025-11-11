import classnames from 'classnames/bind';
import { type DetailedHTMLProps, forwardRef, type HTMLAttributes } from 'react';
import styles from './index.module.scss';

const css = classnames.bind(styles);

export interface ContactCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const ContactCard = forwardRef<HTMLDivElement, ContactCardProps>(({ children }: ContactCardProps, ref) => {
  return (
    <div ref={ref} className={css('utrecht-contact-card')}>
      {children}
    </div>
  );
});

ContactCard.displayName = 'ContactCard';
