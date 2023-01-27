import { call, put, takeEvery } from 'redux-saga/effects';

import {
  FETCH_LISTS,
  SET_ERROR,
  SET_SUCCESS,
  CREATE_TASK,
  TOGGLE_CHECK_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from '@/plugins/store/actions/actions';
import taskService from '@/services/taskService';
import i18n from '@/plugins/lang/i18n';

export function* addTask(action) {
  try {
    yield call(taskService.addTask, action.task);
    yield put({ type: FETCH_LISTS });
    yield put({ type: SET_SUCCESS, message: i18n.t('Task.CreateSuccess') });
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

export function* watchAddTask() {
  yield takeEvery(CREATE_TASK, addTask);
}

export function* toggleCheckTask(action) {
  try {
    yield call(taskService.updateTask, action.task);
    yield put({ type: FETCH_LISTS });
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

export function* watchToggleCheckTask() {
  yield takeEvery(TOGGLE_CHECK_TASK, toggleCheckTask);
}

export function* updateTask(action) {
  try {
    yield call(taskService.updateTask, action.task);
    yield put({ type: FETCH_LISTS });
    yield put({ type: SET_SUCCESS, message: i18n.t('Task.UpdateSuccess') });
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

export function* watchUpdateTask() {
  yield takeEvery(UPDATE_TASK, updateTask);
}

export function* deleteTask(action) {
  try {
    yield call(taskService.deleteTask, action.taskId, action.listId);
    yield put({ type: FETCH_LISTS });
    yield put({ type: SET_SUCCESS, message: i18n.t('Task.DeleteSuccess') });
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

export function* watchDeleteTask() {
  yield takeEvery(DELETE_TASK, deleteTask);
}
