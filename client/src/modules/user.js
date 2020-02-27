import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';
import crypto from 'crypto-js';
import config from '../config';

const LOGIN_USER = 'user/LOGIN_USER';
const AUTH_USER = 'user/AUTH_USER';

export const loginUser = createAction(LOGIN_USER);
export const authUser = createAction(AUTH_USER);

export const asyncLoginUser = (userInfo) => async (dispatch) => {
  try {
    const { id, password } = userInfo;
    const data = {
      id,
      password: crypto.AES.encrypt(password, config.SECRET_KEY).toString(),
    };
    const response = await axios.post(`${config.API_SERVER}/api/user/login`, data);
    dispatch(loginUser(response));
  } catch (err) {
    console.log(err);
    dispatch(loginUser(err));
  }
};
export const asyncAuthUser = () => async (dispatch) => {
  try {
    // FIXME 하드코딩
    const response = await axios.post('http://localhost:5000/api/user/auth');
    dispatch(authUser(response));
  } catch (err) {
    console.error(err);
  }
};

const initialState = {};

export default handleActions({
  [LOGIN_USER]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
}, initialState);
