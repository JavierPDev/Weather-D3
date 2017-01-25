import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import Main from 'Main';
import Forecast from 'Forecast';
import Windspeed from 'Windspeed';
import Humidity from 'Humidity';
import Averages from 'Averages';

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRedirect to="/forecast" />
      <Route path="forecast" component={Forecast} />
      <Route path="windspeed" component={Windspeed} />
      <Route path="humidity" component={Humidity} />
      <Route path="averages" component={Averages} />
    </Route>
  </Router>
)
