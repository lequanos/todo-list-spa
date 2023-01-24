import { SET_USER, SET_LANG } from '@/plugins/store/actions/actions';

export const initialState = {
  email: '',
  lang: 'fr-FR',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        email: action.email,
      };
    }
    case SET_LANG: {
      return {
        ...state,
        lang: action.lang,
      };
    }
    default:
      return state;
  }
};

export default reducer;
