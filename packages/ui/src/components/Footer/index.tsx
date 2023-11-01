import {
  Heading2,
  Heading3,
  Link,
  LinkSocial,
  ListSocial,
  ListSocialItem,
  Page,
  PageFooter,
  Paragraph,
} from '@utrecht/component-library-react';
import {
  UtrechtIconFacebook,
  UtrechtIconInstagram,
  UtrechtIconLinkedin,
  UtrechtIconWhatsapp,
  UtrechtIconX,
} from '@utrecht/web-component-library-react';
import classnames from 'classnames/bind';
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
  x: UtrechtIconX,
  whatsapp: UtrechtIconWhatsapp,
};

interface FooterProps {
  data: FooterData;
}

export const Footer = ({ data }: FooterProps) => (
  <PageFooter className={css('utrecht-footer')}>
    <Page style={{ '--utrecht-page-margin-inline-end': '1rem', '--utrecht-page-margin-inline-start': '1rem' } as any}>
      <div className={css('utrecht-grid__container')}>
        <div className={css('utrecht-grid__cell', 'utrecht-grid--md-8', 'utrecht-grid--sm-9')}>
          {data?.title && <Heading2>{data?.title}</Heading2>}
          <ul className={css('utrecht-link-list', 'utrecht-grid__container')}>
            {data?.list &&
              data.list.length > 0 &&
              data.list.map((listItem, index) => (
                <li
                  key={index}
                  className={css(
                    'utrecht-link-list__item',
                    'utrecht-grid__cell',
                    `utrecht-grid--md-${listItem.column}`,
                  )}
                >
                  {listItem?.title && (
                    <Heading3 className={css('utrecht-footer__list-title')}>{listItem.title}</Heading3>
                  )}
                  {listItem.items &&
                    listItem.items.length > 0 &&
                    listItem.items.map((item, index) => (
                      <Link key={index} href={item.link} className={css('utrecht-footer__link')}>
                        {item.title}
                      </Link>
                    ))}
                  {listItem?.paragraph && (
                    <Paragraph style={{ whiteSpace: 'pre-line' }}>{listItem.paragraph}</Paragraph>
                  )}
                </li>
              ))}
          </ul>
        </div>
        <div
          className={css(
            'utrecht-grid__cell',
            'utrecht-grid--md-4',
            'utrecht-grid--sm-3',
            'utrecht-grid--justify-content-sm-flex-end',
          )}
        >
          <ListSocial>
            {data?.social_media &&
              data.social_media.length > 0 &&
              data.social_media.map((socialItem, index) => {
                const Icon = socialMediaIconTypes[socialItem.icon as keyof typeof socialMediaIconTypes];
                return (
                  <ListSocialItem key={index}>
                    <LinkSocial
                      external={socialItem.external}
                      href={socialItem.link}
                      title={socialItem.title}
                      className="utrecht-link-social"
                    >
                      <Icon />
                    </LinkSocial>
                  </ListSocialItem>
                );
              })}
          </ListSocial>
        </div>
      </div>
    </Page>
  </PageFooter>
);
