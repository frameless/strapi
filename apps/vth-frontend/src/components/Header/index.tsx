import {
  Grid,
  GridCell,
  Link,
  Logo,
  LogoImage,
  Navigation,
  type NavigationListType,
  PageHeader,
  SkipLink,
} from '@/components';

interface HeaderProps {
  navList: NavigationListType[];
  logo: {
    href: string;
    ariaLabel: string;
  };
}

export const Header = ({ navList, logo: { ariaLabel, href } }: HeaderProps) => (
  <PageHeader>
    <div className="utrecht-skip-link-container">
      <SkipLink href="#main">Ga naar inhoud</SkipLink>
    </div>
    <Grid>
      <GridCell xs={6}>
        <Link
          href={href}
          className="utrecht-link utrecht-link--html-a utrecht-link--box-content utrecht-logo__wrapper"
          aria-label={ariaLabel}
        >
          <Logo>
            <LogoImage />
          </Logo>
        </Link>
      </GridCell>
      <GridCell xs={6} md={12}>
        {navList && (
          <Navigation
            list={navList}
            mobileBreakpoint={998}
            toggleButton={{
              openText: 'Menu',
              closeText: 'Sluiten',
            }}
            aria-label="Hoofdmenu"
          />
        )}
      </GridCell>
    </Grid>
  </PageHeader>
);
