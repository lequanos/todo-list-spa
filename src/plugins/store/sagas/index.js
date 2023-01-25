import { all } from 'redux-saga/effects';
import { watchFetchLists, watchCreateList } from './lists';

export default function* rootSaga() {
  yield all([watchFetchLists(), watchCreateList()]);
}
