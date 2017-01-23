import * as redux from 'redux';
import thunk from 'redux-thunk';

import forecastReducer from 'forecastReducer';
import appReducer from 'appReducer';
import selectConditionsReducer from 'selectConditionsReducer';

export const store = configureStore();

function configureStore() {
  const reducer = redux.combineReducers({
    app: appReducer,
    selectedConditions: selectConditionsReducer,
    forecast: forecastReducer
  });

  // Setup for chrome redux devtools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
  const store = redux.createStore(reducer, composeEnhancers(redux.applyMiddleware(thunk)));

  return store;
}
