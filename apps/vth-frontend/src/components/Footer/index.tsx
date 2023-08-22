import classnames from 'classnames/bind';
import React, { FC } from 'react';
import {
  Heading2,
  Heading3,
  Link,
  LinkSocial,
  ListSocial,
  ListSocialItem,
  PageFooter,
  Paragraph,
  UtrechtIconFacebook,
  UtrechtIconInstagram,
  UtrechtIconLinkedin,
  UtrechtIconTwitter,
  UtrechtIconWhatsapp,
} from '@/components';
import styles from './index.module.scss';

const css = classnames.bind(styles);

interface FooterItem {
  title: string | null;
  items: FooterSubItem[];
  paragraph: string | null;
  column: number;
}

interface FooterSubItem {
  title: string;
  link: string;
  external: boolean;
}

interface SocialMediaItem {
  icon: string;
  link: string;
  external: boolean;
  title: string;
}

interface FooterData {
  title: string;
  list: FooterItem[];
  social_media: SocialMediaItem[];
}

const socialMediaIconTypes = {
  facebook: UtrechtIconFacebook,
  instagram: UtrechtIconInstagram,
  linkedin: UtrechtIconLinkedin,
  twitter: UtrechtIconTwitter,
  whatsapp: UtrechtIconWhatsapp,
};

interface FooterProps {
  data: FooterData;
}

export const Footer: FC<FooterProps> = ({ data }) => (
  <PageFooter>
    <div className={css('utrecht-footer__layout-wrapper')}>
      <div className={css('utrecht-footer__content')}>
        {data?.title && <Heading2>{data?.title}</Heading2>}
        <ul className={css('utrecht-link-list', 'utrecht-footer__layout-wrapper')}>
          {data?.list &&
            data.list.length > 0 &&
            data.list.map((listItem, index) => (
              <li
                key={index}
                className={css('utrecht-link-list__item', `utrecht-footer__list-item--${listItem.column}`)}
              >
                {listItem?.title && <Heading3 className={css('utrecht-footer__list-title')}>{listItem.title}</Heading3>}
                {listItem.items &&
                  listItem.items.length > 0 &&
                  listItem.items.map((item, index) => (
                    <Link key={index} href={item.link} className={css('utrecht-footer__link')}>
                      {item.title}
                    </Link>
                  ))}
                {listItem?.paragraph && <Paragraph style={{ whiteSpace: 'pre-line' }}>{listItem.paragraph}</Paragraph>}
              </li>
            ))}
        </ul>
      </div>
      <div className={css('utrecht-footer__social-media')}>
        <ListSocial>
          {data?.social_media &&
            data.social_media.length > 0 &&
            data.social_media.map((socialItem, index) => {
              const Icon = socialMediaIconTypes[socialItem.icon as keyof typeof socialMediaIconTypes];
              return (
                <ListSocialItem key={index}>
                  <LinkSocial external={socialItem.external} href={socialItem.link} title={socialItem.title}>
                    <Icon />
                  </LinkSocial>
                </ListSocialItem>
              );
            })}
        </ListSocial>
      </div>
    </div>
  </PageFooter>
);
