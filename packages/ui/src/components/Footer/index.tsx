import { Heading2, Heading3, Link, Page, PageFooter, Paragraph } from '@utrecht/component-library-react';
import {
  UtrechtIconChevronRight,
  UtrechtIconFacebook,
  UtrechtIconInstagram,
  UtrechtIconLinkedin,
  UtrechtIconNieuwsbrief,
  UtrechtIconWhatsapp,
  UtrechtIconX,
} from '@utrecht/web-component-library-react';
import classnames from 'classnames/bind';
import styles from './index.module.scss';
import { Grid, GridCell } from '../Grid';

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
  newsletter: UtrechtIconNieuwsbrief,
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
          <ul className={css('utrecht-link-list', 'utrecht-link-list--html-ul', 'utrecht-grid__container')}>
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
                  <Grid flexDirection="column" spacing="sm">
                    {listItem.items &&
                      listItem.items.length > 0 &&
                      listItem.items.map((item, index) => (
                        <GridCell>
                          <Link key={index} external href={item.link} className={css('utrecht-link-list__link')}>
                            <UtrechtIconChevronRight />
                            <span className="utrecht-link-list__link-text">{item.title}</span>
                          </Link>
                        </GridCell>
                      ))}
                  </Grid>
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
          <ul className={css('utrecht-link-list', 'utrecht-link-list--html-ul', 'utrecht-link-list--social-media')}>
            {data?.social_media &&
              data.social_media.length > 0 &&
              data.social_media.map((socialItem, index) => {
                const Icon = socialMediaIconTypes[socialItem.icon as keyof typeof socialMediaIconTypes];
                return (
                  <li key={index} className={css('utrecht-link-list__item')}>
                    <Link
                      external={socialItem.external}
                      href={socialItem.link}
                      className={css('utrecht-link-list__link')}
                    >
                      <Icon />
                      <span className="utrecht-link-list__link-text">{socialItem.title}</span>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </Page>
  </PageFooter>
);
