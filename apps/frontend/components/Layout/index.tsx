import { Page, PageContent, PageFooter, PageHeader } from "@utrecht/component-library-react";
import Link from "next/link";
import React from "react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { UtrechtLogo } from "../UtrechtLogo";
import { LanguageSwitcherProps } from "../LanguageSwitcher/index";

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => <main>{children}</main>;

const escapeComment = (data: any) => String(data).replace(/--/g, "-\u200B-");

const HTMLComment = ({ data }: any) => (
  <noscript dangerouslySetInnerHTML={{ __html: `<!--${escapeComment(data)}-->` }} />
);

export const SearchIndexContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    <HTMLComment data="TYPO3SEARCH_begin" />
    {children}
    <HTMLComment data="TYPO3SEARCH_end" />
  </>
);

interface LayoutProps extends LanguageSwitcherProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, onClick, localizations }) => (
  <Page className="utrecht-main-wrapper">
    <PageHeader className="utrecht-page-header--modifier">
      <Link passHref href="/">
        <UtrechtLogo />
      </Link>
      <nav>
        <LanguageSwitcher onClick={onClick} localizations={localizations} />
      </nav>
    </PageHeader>
    <PageContent className="utrecht-page-content--modifier" style={{ position: "relative" }}>
      <SearchIndexContent>
        <Main>{children}</Main>
      </SearchIndexContent>
    </PageContent>
    <PageFooter />
  </Page>
);
