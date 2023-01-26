import {
  TOGGLE_ADD_LIST_MODAL,
  TOGGLE_ADD_TASK_MODAL,
} from '@/plugins/store/actions/actions';

export const initialState = {
  addListModal: false,
  addTaskModal: false,
  listId: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_ADD_LIST_MODAL: {
      return {
        ...state,
        addListModal: action.addListModal,
      };
    }
    case TOGGLE_ADD_TASK_MODAL: {
      return {
        ...state,
        addTaskModal: action.addTaskModal,
        listId: action.listId || '',
      };
    }
    default:
      return state;
  }
};

export default reducer;
