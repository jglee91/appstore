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
export const fetchAdd = (company) => async (dispatch) => {
  const response = await axios.post(`${config.API_SERVER}/api/company`, company);
  dispatch(add(response));
};
export const fetchModify = (companyId, company) => async (dispatch) => {
  const response = await axios.put(`${config.API_SERVER}/api/company/${companyId}`, company);
  dispatch(modify(response));
};
export const fetchRemove = (companyId) => async (dispatch) => {
  await axios.delete(`${config.API_SERVER}/api/company/${companyId}`);
  dispatch(remove({ _id: companyId }));
};

export default handleActions({
  [GET_LIST]: (state, action) => (
    action.payload.data
  ),
  [ADD]: (state, action) => (
    [...state, action.payload.data]
  ),
  [MODIFY]: (state, action) => (
    state.map((company) => {
      if(company._id === action.payload.data._id) {
        return { ...company, ...action.payload.data };
      } else {
        return company;
      }
    })
  ),
  [REMOVE]: (state, action) => (
    state.filter((company) => company._id !== action.payload._id)
  ),
}, []);
