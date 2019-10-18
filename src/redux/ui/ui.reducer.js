import { LOADING_UI, CLEAR_UI_ERRORS, SET_UI_ERRORS } from './ui.types';

const initialState = {
  loading: false,
  errors: {},
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_UI_ERRORS:
      return { ...state, loading: false, errors: {} };
    case LOADING_UI:
      return { ...state, loading: true };
    case SET_UI_ERRORS:
      return { ...state, errors: action.payload.errors, loading: false };
    default:
      return state;
  }
};

export default uiReducer;
