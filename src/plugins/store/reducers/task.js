import { SET_TASK, RESET_TASK } from '@/plugins/store/actions/actions';

export const initialState = {
  id: '',
  title: '',
  endDate: '',
  status: '',
  listId: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_TASK: {
      return {
        id: action.task.id,
        title: action.task.title,
        endDate: action.task.endDate,
        status: action.task.status,
        listId: action.task.listId,
      };
    }
    case RESET_TASK:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
