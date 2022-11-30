/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import { NotFound } from '@strapi/helper-plugin';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';

import '@utrecht/component-library-css';
import '@utrecht/design-tokens/dist/index.css';

function App() {
  return (
    <div className="utrecht-theme">
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
