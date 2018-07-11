import * as types from './actionTypes';
import api from '@/api';
import ErrorService from '@/services/error';

export const getRegionList = ({ keyword, pageNo, pageSize }) => {
  return dispatch => {
    return api.region.regionSearch({ keyword, pageNo, pageSize })
      .then(res => {
        dispatch(updateRoginList(res.data.data));
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          dispatch(updateRoginList([]));
        }
        if (err.response) console.log(err.response);
        ErrorService.handleAPIError(err);
      })
  }
};

const updateRoginList = (regionList) => {
  return {
    type: types.REGION_LIST,
    regionList
  };
};

export const getMoreRegion = ({ keyword, pageNo, pageSize }) => {
  return dispatch => {
    return api.region.regionSearch({ keyword, pageNo, pageSize })
      .then(res => {
        dispatch(moreRegion(res.data.data));
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          dispatch(updateRoginList([]));
        }
        if (err.response) console.log(err.response);
        ErrorService.handleAPIError(err);
      })
  }
};

const moreRegion = (regionList) => {
  return {
    type: types.MORE_REGION,
    regionList
  };
};

export const updateRegionKeyword = (keyword) => {
  return {
    type: types.SEARCH_KEYWORD,
    keyword
  };
};


