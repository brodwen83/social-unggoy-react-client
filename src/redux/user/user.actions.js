import APIClient from '../../modules/database.infrastructure';

import { SET_USER, LOADING_USER, USER_ERROR_RESPONSE } from './user.types';

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
  try {
    dispatch({ type: LOADING_USER });
    const data = await APIClient.read('/user');

    dispatch(setUserDataResponse(data));
  } catch (error) {
    console.error('getUserData->error', error);
    dispatch(setUserErrorsResponse(error.response));
  }
};
