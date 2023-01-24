import { combineReducers } from 'redux';

import userReducer from './user';
import listsReducer from './lists';

const rootReducer = combineReducers({
  user: userReducer,
  lists: listsReducer,
});

export default rootReducer;
