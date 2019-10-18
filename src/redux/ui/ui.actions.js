import { LOADING_UI, SET_UI_ERRORS, CLEAR_UI_ERRORS } from './ui.types';

export const uiIsLoading = () => ({
  type: LOADING_UI,
});

export const setUIErrors = errors => ({
  type: SET_UI_ERRORS,
  payload: { errors },
});

export const clearUIErrors = () => ({
  type: CLEAR_UI_ERRORS,
});
