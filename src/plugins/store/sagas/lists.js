import { call, put, takeEvery } from 'redux-saga/effects';

import {
  SET_LISTS,
  FETCH_LISTS,
  SET_ERROR,
  SET_SUCCESS,
  CREATE_LIST,
  UPDATE_LIST,
  DELETE_LIST,
} from '@/plugins/store/actions/actions';
import listService from '@/services/listService';
import i18n from '@/plugins/lang/i18n';

export function* fetchLists() {
  try {
    const result = yield call(listService.getMyLists);
    yield put({ type: SET_LISTS, lists: result.data });
  } catch (error) {
    if (error.response?.status === 401) throw new Response('', { status: 401 });
    yield put({
      type: SET_ERROR,
      message: error.response.message || error.response.data.message,
    });
  }
}

export function* watchFetchLists() {
  yield takeEvery(FETCH_LISTS, fetchLists);
}

export function* createList(action) {
  try {
    yield call(listService.createList, action.title);
    yield put({ type: FETCH_LISTS });
    yield put({ type: SET_SUCCESS, message: i18n.t('List.CreateSuccess') });
  } catch (error) {
    if (error.response?.status === 401) throw new Response('', { status: 401 });
    yield put({
      type: SET_ERROR,
      message: error.response.message || error.response.data.message,
    });
  }
}

export function* watchCreateList() {
  yield takeEvery(CREATE_LIST, createList);
}

export function* updateList(action) {
  try {
    yield call(listService.updateList, action.list);
    yield put({ type: FETCH_LISTS });
    yield put({ type: SET_SUCCESS, message: i18n.t('List.UpdateSuccess') });
  } catch (error) {
    if (error.response?.status === 401) throw new Response('', { status: 401 });
    yield put({
      type: SET_ERROR,
      message: error.response.message || error.response.data.message,
    });
    yield put({ type: FETCH_LISTS });
  }
}

export function* watchUpdateList() {
  yield takeEvery(UPDATE_LIST, updateList);
}

export function* deleteList(action) {
  try {
    yield call(listService.deleteList, action.listId);
    yield put({
      type: FETCH_LISTS,
    });
    yield put({
      type: SET_SUCCESS,
      message: i18n.t('List.DeleteSuccess'),
    });
  } catch (error) {
    if (error.response?.status === 401)
      throw new Response('', {
        status: 401,
      });
    yield put({
      type: SET_ERROR,
      message: error.response.message || error.response.data.message,
    });
  }
}

export function* watchDeleteList() {
  yield takeEvery(DELETE_LIST, deleteList);
}
