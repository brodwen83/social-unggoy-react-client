import axios from 'axios';
import APIClient from '../../modules/database.infrastructure';

import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './auth.types';

// Action creators
export const login = (email, password) => ({
  type: LOGIN,
  pyload: {
    email,
    password,
  },
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
    const { data } = await axios.post('/login', userData);
    dispatch(userLoggedIn(data.token));
    APIClient.init(data.token);
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
    APIClient.init(data.token);
    history.push('/');
  } catch (error) {
    console.log(error.response.data);
    dispatch(loginFailed(error.response.data));
  }
};
