import { SET_ERROR, CLOSE_TOAST } from '@/plugins/store/actions/actions';

export const initialState = {
  open: false,
  message: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ERROR: {
      return {
        open: true,
        message: action.error.message,
      };
    }
    case CLOSE_TOAST: {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
