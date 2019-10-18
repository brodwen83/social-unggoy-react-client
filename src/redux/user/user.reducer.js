import {
  SET_USER_AUTENTICATED,
  SET_USER_UNAUTENTICATED,
  SET_USER,
} from './user.types';

const initialState = {
  authenticated: false,
  data: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_USER_UNAUTENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        data: { ...action.payload.data },
      };
    default:
      return state;
  }
};

export default userReducer;
