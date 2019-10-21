import {
  SET_USER_AUTHENTICATED,
  SET_USER_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
} from './user.types';

const initialState = {
  auth: { authenticated: false, token: '' },
  loading: false,
  data: {
    credentials: {},
    likes: [],
    notifications: [],
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTHENTICATED:
      return {
        ...state,
        auth: { authenticated: true, token: action.payload.token },
      };
    case SET_USER_UNAUTHENTICATED:
      return { ...initialState };
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
    default:
      return state;
  }
};

export default userReducer;
