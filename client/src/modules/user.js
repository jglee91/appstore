import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';
import crypto from 'crypto-js';
import config from '../config';

const LOGIN = 'user/LOGIN';
const AUTH = 'user/AUTH';

export const login = createAction(LOGIN);
export const auth = createAction(AUTH);

export const doLogin = (userInfo) => async (dispatch) => {
  const { id, password } = userInfo;
  const data = {
    id,
    password: crypto.AES.encrypt(password, config.SECRET_KEY).toString(),
  };
  const response = await axios.post(`${config.API_SERVER}/api/user/login`, data);
  localStorage.setItem('token', response.data.token);
  dispatch(login(response));
};
export const doAuth = () => async (dispatch) => {
  try {
    // FIXME 하드코딩
    const response = await axios.post('http://localhost:5000/api/user/auth');
    dispatch(auth(response));
  } catch (err) {
    console.error(err);
  }
};

const initialState = {};

export default handleActions({
  [LOGIN]: (state, action) => ({
    ...state,
    ...action.payload.data.user,
  }),
}, initialState);
