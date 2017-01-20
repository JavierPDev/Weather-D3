import * as redux from 'redux';
import thunk from 'redux-thunk';

import forecastReducer from 'forecastReducer';

export const store = configureStore();

function configureStore() {
  const reducer = redux.combineReducers({
    forecast: forecastReducer
  });

  // Setup for chrome redux devtools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
  const store = redux.createStore(reducer, composeEnhancers(redux.applyMiddleware(thunk)));

  return store;
}
