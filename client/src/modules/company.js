import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';
import config from '../config';

const GET_LIST = 'company/GET_LIST';
const ADD = 'company/ADD';
const MODIFY = 'company/MODIFY';
const REMOVE = 'company/REMOVE';

export const getList = createAction(GET_LIST);
export const add = createAction(ADD);
export const modify = createAction(MODIFY);
export const remove = createAction(REMOVE);

export const fetchGetList = () => async (dispatch) => {
  const response = await axios.get(`${config.API_SERVER}/api/company`);
  dispatch(getList(response));
};
export const fetchAdd = () => async (dispatch) => {

};
export const fetchModify = () => async (dispatch) => {

};
export const fetchRemove = () => async (dispatch) => {

};

export default handleActions({
  [GET_LIST]: (state, action) => ({
    company: [...state, ...action.payload.data],
  }),
  [ADD]: (state, action) => ({

  }),
  [MODIFY]: (state, action) => ({

  }),
  [REMOVE]: (state, action) => ({

  }),
}, {});
