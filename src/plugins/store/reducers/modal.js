import {
  TOGGLE_LIST_MODAL,
  TOGGLE_TASK_MODAL,
  TOGGLE_DELETE_MODAL,
} from '@/plugins/store/actions/actions';

export const initialState = {
  listModal: false,
  taskModal: false,
  deleteModal: false,
  listId: '',
  taskId: '',
  listTitle: '',
  taskTitle: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_LIST_MODAL: {
      return {
        ...state,
        listModal: action.listModal,
      };
    }
    case TOGGLE_TASK_MODAL: {
      return {
        ...state,
        taskModal: action.taskModal,
        listId: action.listId || '',
      };
    }
    case TOGGLE_DELETE_MODAL: {
      return {
        ...state,
        deleteModal: action.deleteModal,
        listId: action.listId || '',
        taskId: action.taskId || '',
        listTitle: action.listTitle || '',
        taskTitle: action.taskTitle || '',
      };
    }
    default:
      return state;
  }
};

export default reducer;
