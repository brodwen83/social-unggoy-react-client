import axios from 'axios';
import APIClient from '../../modules/database.infrastructure';

import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './auth.types';
import { getUserData } from '../user/user.actions';

// Action creators
export const login = () => ({
  type: LOGIN,
});

export const userLoggedIn = token => {
  localStorage.setItem('FBIdToken', token);
  return {
    type: LOGIN_SUCCESS,
    payload: { token },
  };
};

export const loginFailed = errors => ({
  type: LOGIN_FAILED,
  payload: { errors },
});

export const userLoggedOut = () => ({
  type: LOGOUT,
});

export const logoutUser = () => dispatch => {
  localStorage.removeItem('FBIdToken');
  dispatch(userLoggedOut());
};

// requests
export const loginUser = (userData, history) => async dispatch => {
  try {
    dispatch(login());
    const { data } = await axios.post('/login', userData);
    APIClient.init(data.token);
    dispatch(userLoggedIn(data.token));
    dispatch(getUserData());
    history.push('/');
  } catch (error) {
    console.log('loginUser->error', error);
    console.log(error.response.data);
    dispatch(loginFailed(error.response.data));
  }
};

export const signupUser = (newUserData, history) => async dispatch => {
  try {
    const { data } = await axios.post('/signup', newUserData);
    dispatch(userLoggedIn(data.token));
    dispatch(userLoggedIn(data.token));
    APIClient.init(data.token);
    history.push('/');
  } catch (error) {
    console.log(error.response.data);
    dispatch(loginFailed(error.response.data));
  }
};
