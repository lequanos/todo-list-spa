import { all } from 'redux-saga/effects';
import {
  watchFetchLists,
  watchCreateList,
  watchUpdateList,
  watchDeleteList,
} from './lists';
import { watchAddTask, watchToggleCheckTask, watchUpdateTask } from './tasks';

export default function* rootSaga() {
  yield all([
    watchFetchLists(),
    watchCreateList(),
    watchUpdateList(),
    watchDeleteList(),
    watchAddTask(),
    watchToggleCheckTask(),
    watchUpdateTask(),
  ]);
}
