import * as redux from 'redux';
import thunk from 'redux-thunk';

import defaultReducer from 'defaultReducer';

export const store = configureStore();

function configureStore() {
  const reducer = redux.combineReducers({
    default: defaultReducer
  });

  // Setup for chrome redux devtools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
  const store = redux.createStore(reducer, composeEnhancers(redux.applyMiddleware(thunk)));

  return store;
}
