import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';
import config from '../config';

const GET_LIST = 'project/GET_LIST';
const ADD = 'project/ADD';
const MODIFY = 'project/MODIFY';
const REMOVE = 'project/REMOVE';

export const getList = createAction(GET_LIST);
export const add = createAction(ADD);
export const modify = createAction(MODIFY);
export const remove = createAction(REMOVE);

export const fetchGetList = () => async (dispatch) => {
  const response = await axios.get(`${config.API_SERVER}/api/project`);
  dispatch(getList(response));
};
export const fetchAdd = (project) => async (dispatch) => {
  const response = await axios.post(`${config.API_SERVER}/api/project`, project);
  dispatch(add(response));
};
export const fetchModify = (projectId, project) => async (dispatch) => {
  const response = await axios.put(`${config.API_SERVER}/api/project/${projectId}`, project);
  dispatch(modify(response));
};
export const fetchRemove = (projectId) => async (dispatch) => {
  await axios.delete(`${config.API_SERVER}/api/project/${projectId}`);
  dispatch(remove({ _id: projectId }));
};

export default handleActions({
  [GET_LIST]: (state, action) => (
    action.payload.data
  ),
  [ADD]: (state, action) => (
    [...state, action.payload.data]
  ),
  [MODIFY]: (state, action) => (
    state.map((project) => {
      if(project._id === action.payload.data._id) {
        return { ...project, ...action.payload.data };
      } else {
        return project;
      }
    })
  ),
  [REMOVE]: (state, action) => (
    state.filter((project) => project._id !== action.payload._id)
  ),
}, []);
