import { SET_LISTS } from '@/plugins/store/actions/actions';

export const initialState = [];

const reducer = (state = initialState, action = {}) => {
  console.log(action);
  switch (action.type) {
    case SET_LISTS: {
      return [...action.lists];
    }
    default:
      return state;
  }
};

export default reducer;
