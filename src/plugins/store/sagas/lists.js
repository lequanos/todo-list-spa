import { call, put, takeEvery } from 'redux-saga/effects';

import { SET_LISTS, FETCH_LISTS } from '@/plugins/store/actions/actions';

import api from '@/api/api';

export function* fetchLists() {
  const result = yield call(api.get, '/lists');
  yield put({ type: SET_LISTS, lists: result.data });
}

export function* watchFetchLists() {
  yield takeEvery(FETCH_LISTS, fetchLists);
}
