import { Box, Layout, SubNav, SubNavHeader, SubNavLink, SubNavSection, SubNavSections } from '@strapi/design-system';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import FilterIcon from '@strapi/icons/Filter';
import InformationIcon from '@strapi/icons/Information';
import React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import pluginId from '../../pluginId';
import AdditionalInformationDetailPage from '../AdditionalInformationDetailPage';
import AdditionalInformationFilterPage from '../AdditionalInformationFilterPage';
import ProductDetailPage from '../ProductDetailPage';
import ProductFilterPage from '../ProductFilterPage';

const App = () => {
  const location = useLocation();

  return (
    <div className="utrecht-theme">
      <Layout
        sideNav={
          <SubNav aria-label="Custom plugin navigation">
            <SubNavHeader label="Content compliance checker" />
            <SubNavSections>
              <SubNavSection label="Filters">
                <SubNavLink
                  as={Link}
                  to={`/plugins/${pluginId}`}
                  icon={<FilterIcon />}
                  active={location.pathname === `/plugins/${pluginId}`}
                >
                  Productfilters
                </SubNavLink>
                <SubNavLink
                  as={Link}
                  to={`/plugins/${pluginId}/additional-information-filter`}
                  icon={<InformationIcon />}
                  active={location.pathname.includes('additional-information-filter')}
                >
                  Aanvullende informatiefilters
                </SubNavLink>
              </SubNavSection>
            </SubNavSections>
          </SubNav>
        }
      >
        <Box background="neutral100">
          <Switch>
            <Route path={`/plugins/${pluginId}`} component={ProductFilterPage} exact />
            <Route path={`/plugins/${pluginId}/product-filter/:id`} component={ProductDetailPage} />
            <Route
              path={`/plugins/${pluginId}/additional-information-filter`}
              component={AdditionalInformationFilterPage}
              exact
            />
            <Route
              path={`/plugins/${pluginId}/additional-information-filter/:id`}
              component={AdditionalInformationDetailPage}
            />
            <Route component={AnErrorOccurred} />
          </Switch>
        </Box>
      </Layout>
    </div>
  );
};

export default App;
