import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';
import crypto from 'crypto-js';
import config from '../config';

const AUTH = 'user/AUTH';
const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';

export const auth = createAction(AUTH);
export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);

export const fetchAuth = () => async (dispatch) => {
  const token = localStorage.token;
  const data = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${config.API_SERVER}/api/user/auth`, data);
  dispatch(auth(response));
};
export const fetchLogin = (userInfo) => async (dispatch) => {
  const { id, password } = userInfo;
  const data = {
    id,
    password: crypto.AES.encrypt(password, config.SECRET_KEY).toString(),
  };
  const response = await axios.post(`${config.API_SERVER}/api/user/login`, data);
  localStorage.setItem('token', response.data.token);
  dispatch(login(response));
};
export const fetchLogout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());
};

export default handleActions({
  [AUTH]: (state, action) => ({
    ...state,
    ...action.payload.data.user,
  }),
  [LOGIN]: (state, action) => ({
    ...state,
    ...action.payload.data.user,
  }),
  [LOGOUT]: (state, action) => ({
    // empty user state
  }),
}, {});
