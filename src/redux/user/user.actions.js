import axios from 'axios';

import {
  SET_USER,
  SET_USER_UNAUTENTICATED,
  SET_USER_AUTENTICATED,
} from './user.types';
import { uiIsLoading, setUIErrors, clearUIErrors } from '../ui/ui.actions';

// action creators
export const userLoggedIn = data => ({
  type: SET_USER,
  payload: { data },
});

export const userLoggedOut = () => ({
  type: SET_USER_UNAUTENTICATED,
});

export const authenticateUser = token => ({
  type: SET_USER_AUTENTICATED,
  payload: { token },
});

// helpers
const setAuthorizationHeader = token => {
  const FBIdToken = token;

  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const loginUser = (userData, history) => async dispatch => {
  dispatch(uiIsLoading);
  try {
    dispatch(clearUIErrors());
    dispatch(uiIsLoading());

    const { data } = await axios.post('/login', userData);
    setAuthorizationHeader(data.token);
    dispatch(authenticateUser(data.token));
    dispatch(getUserData());
    history.push('/');
  } catch (error) {
    console.log(error.response.data);
    dispatch(setUIErrors(error.response.data));
  }
};

export const signupUser = (newUserData, history) => async dispatch => {
  dispatch(uiIsLoading);
  try {
    dispatch(clearUIErrors());
    dispatch(uiIsLoading());

    const { data } = await axios.post('/signup', newUserData);
    setAuthorizationHeader(data.token);
    dispatch(authenticateUser(data.token));
    dispatch(getUserData());
    history.push('/');
  } catch (error) {
    console.log(error.response.data);
    dispatch(setUIErrors(error.response.data));
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch(userLoggedOut());
};

export const getUserData = () => async dispatch => {
  try {
    const { data } = await axios.get('/user');
    console.log('data', data);

    dispatch(userLoggedIn(data));
    dispatch(clearUIErrors());
  } catch (error) {
    console.error(error);
    dispatch(setUIErrors(error.response.data));
  }
};
