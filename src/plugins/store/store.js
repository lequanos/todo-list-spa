import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import i18n from '../lang/i18n';
import rootSaga from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(reducer, enhancers);
sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  i18n.changeLanguage(store.getState().user.lang);
});

export default store;
