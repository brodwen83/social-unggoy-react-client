import { LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILED } from './auth.types';

const initialState = {
  isAuthenticated: false,
  token: '',
  isLoggingIn: false,
  errors: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggingIn: true,
      };
    case LOGOUT:
      return { ...initialState };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        isLoggingIn: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
}
