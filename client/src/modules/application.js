import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';
import config from '../config';

const GET_LIST = 'application/GET_LIST';
const ADD = 'application/ADD';
const MODIFY = 'application/MODIFY';
const REMOVE = 'application/REMOVE';

export const getList = createAction(GET_LIST);
export const add = createAction(ADD);
export const modify = createAction(MODIFY);
export const remove = createAction(REMOVE);

export const fetchGetList = () => async (dispatch) => {
  const response = await axios.get(`${config.API_SERVER}/api/application`);
  dispatch(getList(response));
};
export const fetchAdd = (application) => async (dispatch) => {
  console.log(application);
  // const response = await axios.post(`${config.API_SERVER}/api/application`, application);
  // dispatch(add(response));
};
export const fetchModify = (applicationId, application) => async (dispatch) => {
  const response = await axios.put(`${config.API_SERVER}/api/application/${applicationId}`, application);
  dispatch(modify(response));
};
export const fetchRemove = (applicationId) => async (dispatch) => {
  await axios.delete(`${config.API_SERVER}/api/application/${applicationId}`);
  dispatch(remove({ _id: applicationId }));
};

export default handleActions({
  [GET_LIST]: (state, action) => (
    action.payload.data
  ),
  [ADD]: (state, action) => (
    [...state, action.payload.data]
  ),
  [MODIFY]: (state, action) => (
    state.map((application) => {
      if(application._id === action.payload.data._id) {
        return { ...application, ...action.payload.data };
      } else {
        return application;
      }
    })
  ),
  [REMOVE]: (state, action) => (
    state.filter((application) => application._id !== action.payload._id)
  ),
}, []);
