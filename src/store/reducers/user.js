import { SET_USER } from '@/store/actions/actions';

export const initialState = {
  email: '',
};

const reducer = (state = initialState, action = {}) => {
  console.log(action.email);
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        email: action.email,
      };
    }
    default:
      return state;
  }
};

export default reducer;
