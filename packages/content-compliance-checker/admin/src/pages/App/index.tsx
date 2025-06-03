import { Box, Layout, SubNav, SubNavHeader, SubNavLink, SubNavSection, SubNavSections } from '@strapi/design-system';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import FilterIcon from '@strapi/icons/Filter';
import InformationIcon from '@strapi/icons/Information';
import React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import pluginId from '../../pluginId';
import AdditionalInformationDetailPage from '../AdditionalInformationDetailPage';
import AdditionalInformationFilterPage from '../AdditionalInformationFilterPage';
import ProductDetailPage from '../ProductDetailPage';
import ProductFilterPage from '../ProductFilterPage';
import getTrad from '../../utils/getTrad';

const App = () => {
  const location = useLocation();
  const { formatMessage } = useIntl();
  return (
    <div className="utrecht-theme">
      <Layout
        sideNav={
          <SubNav
            aria-label={formatMessage({
              id: getTrad('navigation.ariaLabel'),
              defaultMessage: 'Navigatie van de content compliance checker',
            })}
          >
            <SubNavHeader
              label={formatMessage({
                id: getTrad('navigation.header'),
                defaultMessage: 'Controle op inhoudsnaleving',
              })}
            />
            <SubNavSections>
              <SubNavSection
                label={formatMessage({
                  id: getTrad('navigation.section.filters'),
                  defaultMessage: 'Filters',
                })}
              >
                <SubNavLink
                  as={Link}
                  to={`/plugins/${pluginId}`}
                  icon={<FilterIcon />}
                  className={location.pathname === `/plugins/${pluginId}` ? 'active' : ''}
                >
                  {formatMessage({
                    id: getTrad('navigation.link.productFilters'),
                    defaultMessage: 'Productfilters',
                  })}
                </SubNavLink>
                <SubNavLink
                  as={Link}
                  to={`/plugins/${pluginId}/additional-information-filter`}
                  icon={<InformationIcon />}
                  className={location.pathname.includes('additional-information-filter') ? 'active' : ''}
                >
                  {formatMessage({
                    id: getTrad('navigation.link.additionalInfoFilters'),
                    defaultMessage: 'Aanvullende informatiefilters',
                  })}
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
