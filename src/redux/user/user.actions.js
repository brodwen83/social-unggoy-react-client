import axios from 'axios';

import { SET_USER } from './user.types';
import { uiIsLoading, setUIErrors, clearUIErrors } from '../ui/ui.actions';

// action creators
export const userLoggedIn = data => ({
  type: SET_USER,
  payload: { data },
});

export const loginUser = (userData, history) => async dispatch => {
  dispatch(uiIsLoading);
  try {
    dispatch(clearUIErrors());
    dispatch(uiIsLoading());

    const { data } = await axios.post('/login', userData);
    const FBIdToken = data.token;

    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;

    dispatch(getUserData());
    history.push('/');
  } catch (error) {
    console.log(error.response.data);
    dispatch(setUIErrors(error.response.data));
  }
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
