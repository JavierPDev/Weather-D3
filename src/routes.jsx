import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Main from 'Main';
import Forecast from 'Forecast';
import Windspeed from 'Windspeed';
import Humidity from 'Humidity';

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Forecast} />
      <Route path="forecast" component={Forecast} />
      <Route path="windspeed" component={Windspeed} />
      <Route path="humidity" component={Humidity} />
    </Route>
  </Router>
)
