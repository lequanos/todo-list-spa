import { all } from 'redux-saga/effects';
import {
  watchFetchLists,
  watchCreateList,
  watchUpdateList,
  watchDeleteList,
} from './lists';

export default function* rootSaga() {
  yield all([
    watchFetchLists(),
    watchCreateList(),
    watchUpdateList(),
    watchDeleteList(),
  ]);
}
