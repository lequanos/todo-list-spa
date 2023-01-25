import { combineReducers } from 'redux';

import userReducer from './user';
import listsReducer from './lists';
import toastReducer from './toast';

const rootReducer = combineReducers({
  user: userReducer,
  lists: listsReducer,
  toast: toastReducer,
});

export default rootReducer;
