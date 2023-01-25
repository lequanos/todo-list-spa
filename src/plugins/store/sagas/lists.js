import { call, put, takeEvery } from 'redux-saga/effects';

import {
  SET_LISTS,
  FETCH_LISTS,
  SET_ERROR,
  CREATE_LIST,
} from '@/plugins/store/actions/actions';
import listService from '@/services/listService';

export function* fetchLists() {
  try {
    const result = yield call(listService.getMyLists);
    yield put({ type: SET_LISTS, lists: result.data });
  } catch (error) {
    if (error.response?.status === 401) throw new Response('', { status: 401 });
    yield put({ type: SET_ERROR, error });
  }
}

export function* watchFetchLists() {
  yield takeEvery(FETCH_LISTS, fetchLists);
}

export function* createList(action) {
  try {
    yield call(listService.createList, action.title);
    yield put({ type: FETCH_LISTS });
  } catch (error) {
    if (error.response?.status === 401) throw new Response('', { status: 401 });
    yield put({ type: SET_ERROR, error });
  }
}

export function* watchCreateList() {
  yield takeEvery(CREATE_LIST, createList);
}
