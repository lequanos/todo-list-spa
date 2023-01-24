import { legacy_createStore as createStore, compose } from 'redux';

import reducer from './reducers';
import i18n from '../lang/i18n';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers();

const store = createStore(reducer, enhancers);

store.subscribe(() => {
  i18n.changeLanguage(store.getState().user.lang);
});

export default store;
