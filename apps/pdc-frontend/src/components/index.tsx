'use client';
import { ButtonLink } from '@utrecht/component-library-react';
import type { ButtonLinkProps } from '@utrecht/component-library-react';
import dynamic from 'next/dynamic';
import Link, { LinkProps } from 'next/link';
import { ForwardedRef, forwardRef, PropsWithChildren } from 'react';

import { DecisionTreeFormSkeleton } from './Skeleton/DecisionTreeFormSkeleton';

export * from '@utrecht/web-component-library-react';
export * from '@utrecht/component-library-react';
export {
  AdvancedLink,
  Footer,
  formatCurrency,
  Grid,
  GridCell,
  HTMLHeading,
  Img,
  isYouTubeURL,
  LanguageSwitcher,
  LanguageSwitcherSkeleton,
  LiveText,
  LoadMoreButton,
  LogoButton,
  ModalDialog,
  ModalDialogBody,
  ModalDialogCloseButton,
  ModalDialogFooter,
  ModalDialogHeader,
  Nav,
  NavigationList,
  PreviewAlert,
  PriceWidget,
  ProductListItem,
  ProductListPaginationInfo,
  ProductsList,
  SearchIndexContent,
  type ButtonAppearance,
  type Columns,
  type FooterData,
  type FooterProps,
  type GridCellProps,
  type GridProps,
  type HeadingLevel,
  type HTMLHeadingProps,
  type ImgProps,
  type LanguageSwitcherProps,
  type LiveTextProps,
  type LoadMoreButtonProps,
  type LogoButtonProps,
  type LogoType,
  type ModalDialogBodyProps,
  type ModalDialogCloseButtonProps,
  type ModalDialogFooterProps,
  type ModalDialogHeaderProps,
  type MultiColumnsButtonProps,
  type NavigationListType,
  type NavProps,
  type PreviewAlertProps,
  type ProductListItemProps,
  type ProductListPaginationInfoProps,
  type ProductListProps,
  type YouTubeVideoProps,
  useDialog,
  YouTubeVideo,
} from '@frameless/ui';

export const FloLegalDecisionTree = dynamic(
  async () => {
    const Component = (await import('./FloLegalDecisionTree')).FloLegalDecisionTree;
    return { default: Component };
  },
  {
    ssr: false,
    loading: () => <DecisionTreeFormSkeleton />,
  },
);
export { Markdown } from './Markdown';
export { MatomoTagManager } from './MatomoTagManager';
export { SiteImproveAnalytics } from './SiteImproveAnalytics';

// Overwrite `@frameless/ui` version with `"use client"` component
export { GoogleTranslate } from './GoogleTranslate';

export { Breadcrumbs } from './Breadcrumbs';
export { Navigation } from './Navigation';
export { ScrollToTopButton } from './ScrollToTopButton';
export const MultiColumnsButton = dynamic(
  async () => {
    const Component = (await import('@frameless/ui')).MultiColumnsButton;
    return { default: Component };
  },
  { ssr: false },
);

interface IndexCharNavLinkProps extends LinkProps {}
// This component was built because the Next.js Link component requires an href.
export const IndexCharNavLink = forwardRef(
  (
    { href, children, ...restProps }: PropsWithChildren<IndexCharNavLinkProps>,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    if (href)
      return (
        <Link ref={ref} href={href} {...restProps}>
          {children}
        </Link>
      );

    return (
      <ButtonLink ref={ref} {...(restProps as ButtonLinkProps)}>
        {children}
      </ButtonLink>
    );
  },
);

IndexCharNavLink.displayName = 'IndexCharNavLink';
