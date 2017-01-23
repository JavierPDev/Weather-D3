import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Main from 'Main';
import Forecast from 'Forecast';
import About from 'About';

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Forecast} />
      <Route path="forecast" component={Forecast} />
      <Route path="about" component={About} />
    </Route>
  </Router>
)
