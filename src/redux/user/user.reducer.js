import {
  SET_USER_AUTENTICATED,
  SET_USER_UNAUTENTICATED,
  SET_USER,
} from './user.types';

const initialState = {
  auth: { authenticated: false, token: '' },
  data: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTENTICATED:
      return {
        ...state,
        auth: { authenticated: true, token: action.payload.token },
      };
    case SET_USER_UNAUTENTICATED:
      return { ...initialState };
    case SET_USER:
      return {
        ...state,
        data: { ...action.payload.data },
      };
    default:
      return state;
  }
};

export default userReducer;
