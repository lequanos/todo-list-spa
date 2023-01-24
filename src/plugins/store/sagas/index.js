import { all } from 'redux-saga/effects';
import { watchFetchLists } from './lists';

export default function* rootSaga() {
  yield all([watchFetchLists()]);
}
