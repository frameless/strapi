import { Heading2, Heading3, LinkList, LinkListLink, Page, PageFooter } from '@utrecht/component-library-react';
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
import { Markdown } from '../Markdown';
import { Nav, type NavProps } from '../Nav';

const css = classnames.bind(styles);

type SocialMediaIconTypes = 'facebook' | 'instagram' | 'linkedin' | 'newsletter' | 'whatsapp' | 'x';

interface LinkType {
  id?: string;
  textContent: string;
  href: string;
  icon?: SocialMediaIconTypes;
}

type FooterListItemContent = { id?: string; title: string; link: LinkType[] };
interface FooterListItem {
  listItem: FooterListItemContent[];
}

interface SocialMediaItem {
  link: LinkType[];
}

export type FooterData = {
  title?: string;
  list?: FooterListItem;
  address?: string;
  socialMediaList: SocialMediaItem;
};

const socialMediaIconTypes = {
  facebook: UtrechtIconFacebook,
  instagram: UtrechtIconInstagram,
  linkedin: UtrechtIconLinkedin,
  x: UtrechtIconX,
  whatsapp: UtrechtIconWhatsapp,
  newsletter: UtrechtIconNieuwsbrief,
};
export interface FooterProps {
  data: FooterData;
  headingLevel: NavProps['headingLevel'];
  socialMediaLabel: NavProps['label'];
}

export const Footer = ({ data, headingLevel, socialMediaLabel }: FooterProps) => {
  const links = data?.socialMediaList?.link?.map((item) => {
    const Icon = socialMediaIconTypes[item.icon as keyof typeof socialMediaIconTypes];
    return {
      ...item,
      children: item.textContent,
      icon: <Icon role="presentation" />,
    };
  });

  return (
    <PageFooter className={css('utrecht-footer')}>
      <Page>
        <Grid>
          <GridCell md={8} sm={10}>
            <Grid>
              <GridCell md={12}>{data?.title && <Heading2>{data?.title}</Heading2>}</GridCell>
              <GridCell md={6} sm={6}>
                <ul className={css('utrecht-link-list', 'utrecht-link-list--html-ul')}>
                  {data?.list &&
                    data.list?.listItem?.length > 0 &&
                    data?.list?.listItem?.map((item, index) => (
                      <li key={index} className={css('utrecht-link-list__item')}>
                        {item?.title && (
                          <Heading3 className={css('utrecht-footer__list-title')}>{item?.title}</Heading3>
                        )}
                        <Grid flexDirection="column" spacing="sm">
                          {item?.link &&
                            item?.link?.length > 0 &&
                            item?.link?.map((item, index) => {
                              const isPhoneNumber = item.href.includes('tel:14030');
                              return (
                                <GridCell key={index} sm={12}>
                                  <LinkListLink
                                    icon={!isPhoneNumber && <UtrechtIconChevronRight />}
                                    className={css('utrecht-link-list__link', {
                                      'utrecht-link-list__link--phone': isPhoneNumber,
                                    })}
                                    href={item.href}
                                  >
                                    {item.textContent}
                                  </LinkListLink>
                                </GridCell>
                              );
                            })}
                        </Grid>
                      </li>
                    ))}
                </ul>
              </GridCell>
              <GridCell md={6} sm={6}>
                {data?.address && <Markdown>{data?.address}</Markdown>}
              </GridCell>
            </Grid>
          </GridCell>
          <GridCell md={4} sm={2} className={css('utrecht-grid--justify-content-sm-flex-end')}>
            <Nav headingLevel={headingLevel} label={socialMediaLabel}>
              <LinkList links={links} className={css('utrecht-footer__link-social-media-list')} />
            </Nav>
          </GridCell>
        </Grid>
      </Page>
    </PageFooter>
  );
};
