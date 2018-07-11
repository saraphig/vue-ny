import * as types from './actionTypes';
import api from '@/api';
import ErrorService from '@/services/error';

export const getRegionCurrent = regionCurrent => {
  return dispatch => {
    return api.region.regionDefaultGet()
      .then(res => {
        dispatch(updateRegionCurrent(res.data.data[0]));
      })
      .catch(err => {
        if (err.response) console.log(err.response);
        ErrorService.handleAPIError(err);
      })
  };
};

export const updateRegionCurrent = regionCurrent => {
  return {
    type: types.UPDATE_REGION_CURRENT,
    regionCurrent
  };
};

export const getMonitorList = ({ pageNo, pageSize, areaCode }) => {
  return dispatch => {
    return api.region.getMonitorList({ pageNo, pageSize, areaCode })
      .then(res => {
        dispatch(updateMonitorList(res.data.data));
        dispatch(updateMonitorListTotal(res.data.total));
      })
      .catch(err => {
        if (err.response) console.log(err.response);
        if (err.response && err.response.status === 400) {
          dispatch(updateMonitorList([]));
        }
        ErrorService.handleAPIError(err);
      });
  }
};

const updateMonitorList = monitorList => {
  return {
    type: types.MONITOR_LIST,
    monitorList
  };
};


export const getMoreMonitor = ({ pageNo, pageSize, areaCode }) => {
  return dispatch => {
    return api.region.getMonitorList({ pageNo, pageSize, areaCode })
      .then(res => {
        dispatch(moreMonitor(res.data.data));
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          dispatch(updateMonitorList([]));
        }
        ErrorService.handleAPIError(err);
      });
  }
};

const moreMonitor = monitorList => {
  return {
    type: types.GET_MORE_MONITOR,
    monitorList
  };
};

export const getMonitorCurrent = monitorCurrent => {
  return {
    type: types.GET_MONITOR_CURRENT,
    monitorCurrent
  };
};

const updateMonitorListTotal = monitorListTotal => {
  return {
    type: types.UPDATE_MONITOR_LIST_TOTAL,
    monitorListTotal
  }
};
