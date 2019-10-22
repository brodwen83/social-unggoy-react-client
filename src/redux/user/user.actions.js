import APIClient from '../../modules/database.infrastructure';

import { SET_USER, LOADING_USER, USER_ERROR_RESPONSE } from './user.types';
import { setUIErrors, clearUIErrors } from '../ui/ui.actions';

// action creators
export const setUserDataResponse = data => ({
  type: SET_USER,
  payload: { data },
});

export const setUserErrorsResponse = error => {
  console.log('error', error);
  return {
    type: USER_ERROR_RESPONSE,
    payload: {
      error,
    },
  };
};

// Request
export const getUserData = () => async dispatch => {
  dispatch({ type: LOADING_USER });
  dispatch(clearUIErrors());
  try {
    const data = await APIClient.read('/user');

    dispatch(setUserDataResponse(data));
  } catch (error) {
    console.error(error);
    dispatch(setUIErrors(error.response.data));
    dispatch(setUserErrorsResponse(error.response.data));
  }
};
