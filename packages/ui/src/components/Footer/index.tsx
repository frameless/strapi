import { Heading2, Heading3, Link, Page, PageFooter, Paragraph } from '@utrecht/component-library-react';
import {
  UtrechtIconChevronRight,
  UtrechtIconFacebook,
  UtrechtIconInstagram,
  UtrechtIconLinkedin,
  UtrechtIconWhatsapp,
  UtrechtIconX,
} from '@utrecht/web-component-library-react';
import classnames from 'classnames/bind';
import { SVGProps } from 'react';
import styles from './index.module.scss';
import { Grid, GridCell } from '../Grid';

const css = classnames.bind(styles);

const UtrechtIconNieuwsBrief = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className="utrecht-icon"
    viewBox="0 0 36 36"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    height="1em"
    width="1em"
    {...props}
  >
    <path d="M19.41.49C19.01.17 18.51 0 18 0s-1.01.18-1.41.49l-2.2 1.76h7.2L19.39.49Zm-4.73 21.45.37-.3h.01l.8-.58c.63-.46 1.38-.69 2.13-.69s1.56.25 2.2.74l1.9 1.41 9.42-6.76V4.5H4.5v11.23l9.43 6.77zM9 7.84h18a1.129 1.129 0 1 1 0 2.26H9a1.129 1.129 0 1 1 0-2.26m0 4.51h18a1.129 1.129 0 1 1 0 2.26H9a1.129 1.129 0 1 1 0-2.26m1.16 4.5h6.7a1.129 1.129 0 1 1 0 2.26H12.9l-2.74-2.25Zm23.59-4.87v2.5l1.68-1.16zm-31.5 0L.57 13.32l1.68 1.16zM0 15.66v18.15l12.09-9.77zm20.74 8.67-1.93-1.43c-.23-.18-.53-.28-.83-.28-.2 0-.51.04-.78.24l-1.14.85L.93 35.96c.07.01.13.04.2.04H33.8L21.54 24.92l-.79-.58Zm3.18-.29 12.07 10.91s.01-.05.01-.07V15.66l-12.08 8.37Z"></path>
  </svg>
);

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
  newsletter: UtrechtIconNieuwsBrief,
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
