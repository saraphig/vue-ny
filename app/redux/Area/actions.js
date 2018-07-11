import * as types from './actionTypes';
import api from '@/api';
import ErrorService from '@/services/error';

// get all areas
export function getAllAreasAsync() {
  return dispatch => {
    return api.area.getAllAreas().then(res => {
      console.log(res);
      dispatch(getAllAreasDone(res));
    }).catch(e => {
      console.log(e);
      ErrorService.handleAPIError(e);
      dispatch(getAllAreasError(e));
    })
  }
}

export function getAllAreasDone(res) {
  const { data } = res;
  return {
    type: types.GET_ALL_AREAS_DONE,
    payload: data
  }
}

export function getAllAreasError(e) {
  return {
    type: types.GET_ALL_AREAS_ERROR,
    error: e
  };
}

// select 
export function selectArea(areaId) {
  return {
    type: types.SELECT_AREA,
    areaId
  }
}
