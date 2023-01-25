import { combineReducers } from 'redux';

import userReducer from './user';
import listsReducer from './lists';
import errorReducer from './error';

const rootReducer = combineReducers({
  user: userReducer,
  lists: listsReducer,
  error: errorReducer,
});

export default rootReducer;
