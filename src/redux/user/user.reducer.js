import { SET_USER, LOADING_USER, USER_ERROR_RESPONSE } from './user.types';

const initialState = {
  loading: false,
  data: {
    credentials: {},
    likes: [],
    notifications: [],
  },
  errors: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loading: false,
        data: { ...action.payload.data },
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case USER_ERROR_RESPONSE:
      return {
        ...state,
        errors: action.payload.errors,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
