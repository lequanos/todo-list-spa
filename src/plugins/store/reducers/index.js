import { combineReducers } from 'redux';

import userReducer from './user';
import listsReducer from './lists';
import toastReducer from './toast';
import modalReducer from './modal';
import taskReducer from './task';

const rootReducer = combineReducers({
  user: userReducer,
  lists: listsReducer,
  toast: toastReducer,
  modal: modalReducer,
  task: taskReducer,
});

export default rootReducer;
