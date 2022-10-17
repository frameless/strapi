import { Page, PageContent, PageFooter, PageHeader } from "@utrecht/component-library-react";
import Link from "next/link";
import React from "react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { UtrechtLogo } from "../UtrechtLogo";
import { LanguageSwitcherProps } from "../LanguageSwitcher/index";

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="utrecht-main">{children}</main>
);

interface LayoutProps extends LanguageSwitcherProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, onClick, localizations }) => (
  <Page className="utrecht-main-wrapper">
    <nav className="utrecht-nav">
      <PageHeader>
        <Link passHref href="/">
          <UtrechtLogo />
        </Link>
      </PageHeader>
      <LanguageSwitcher onClick={onClick} localizations={localizations} />
    </nav>
    <Main>
      <PageContent>{children}</PageContent>
    </Main>
    <PageFooter />
  </Page>
);
