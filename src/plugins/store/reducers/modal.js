import {
  TOGGLE_LIST_MODAL,
  TOGGLE_TASK_MODAL,
} from '@/plugins/store/actions/actions';

export const initialState = {
  listModal: false,
  taskModal: false,
  listId: '',
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
    default:
      return state;
  }
};

export default reducer;
