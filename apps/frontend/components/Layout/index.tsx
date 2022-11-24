import { Article, Page, PageContent, PageFooter, PageHeader } from "@utrecht/component-library-react";
import Link from "next/link";
import React from "react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { UtrechtLogo } from "../UtrechtLogo";
import { LanguageSwitcherProps } from "../LanguageSwitcher/index";
import { SearchBar, SearchBarProps } from "../SearchBar";

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

interface LayoutProps extends LanguageSwitcherProps, SearchBarProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  onClick,
  localizations,
  onSearchChange,
  onSearchSubmit,
  searchBarValue,
  suggestedHits,
  suggestions,
}) => (
  <Page className="utrecht-main-wrapper">
    <PageHeader>
      <nav>
        <Link passHref href="/">
          <UtrechtLogo />
        </Link>
        <div className="nav__content">
          <LanguageSwitcher onClick={onClick} localizations={localizations} />
          <SearchBar
            onSearchChange={onSearchChange}
            suggestedHits={suggestedHits}
            suggestions={suggestions}
            onSearchSubmit={onSearchSubmit}
            searchBarValue={searchBarValue}
          />
        </div>
      </nav>
    </PageHeader>
    <PageContent className="utrecht-page-content--modifier" style={{ position: "relative" }}>
      <SearchIndexContent>
        <Main>
          <Article>{children}</Article>
        </Main>
      </SearchIndexContent>
    </PageContent>
    <PageFooter />
  </Page>
);
