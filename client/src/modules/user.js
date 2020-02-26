import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

const LOGIN_USER = 'user/LOGIN_USER';

export const loginUser = createAction(LOGIN_USER);

export const asyncLoginUser = (userInfo) => async (dispatch) => {
  try {
    // FIXME 하드코딩
    const response = await axios.post('http://localhost:5000/api/user/login', userInfo);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

const initialState = {};

export default handleActions({
  [LOGIN_USER]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
}, initialState);
