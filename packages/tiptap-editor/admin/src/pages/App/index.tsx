/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';

function App() {
  return (
    <div>
      <Switch>
        <Route path={`/settings/${pluginId}`} component={HomePage} exact />
      </Switch>
    </div>
  );
}

export default App;
