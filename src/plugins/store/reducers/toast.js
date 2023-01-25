import {
  SET_ERROR,
  CLOSE_TOAST,
  SET_SUCCESS,
} from '@/plugins/store/actions/actions';

export const initialState = {
  open: false,
  message: '',
  severity: 'success',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ERROR: {
      return {
        open: true,
        message: action.message,
        severity: 'error',
      };
    }
    case SET_SUCCESS: {
      return {
        open: true,
        message: action.message,
        severity: 'success',
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
