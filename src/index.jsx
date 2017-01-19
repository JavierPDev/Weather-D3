import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import { routes } from './routes';

import './main.scss';


ReactDOM.render(
  <Provider store={store}>
      {routes}
  </Provider>,
  document.getElementById('app')
);
