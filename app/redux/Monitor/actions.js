import * as types from './actionTypes';
import api from '@/api';
import ErrorService from '@/services/error';

// Monitor Control
export function monitorLookAround({ direction, id }) {
  return dispatch => {
    return api.monitor.lookAround({ direction, id }).then(res => {
      console.log(res);
    }).catch(e => {
      if (e.response) console.log(e.response);
      ErrorService.handleAPIError(e);
    })
  }
}

export function monitorZoom({ to, id }) {
  return dispatch => {
    return api.monitor.zoom({ to, id }).then(res => {
      console.log(res);
    }).catch(e => {
      if (e.response) console.log(e.response);
      ErrorService.handleAPIError(e);
    })
  }
}

// Others
export function monitorLoading({ status }) {
  return {
    type: types.MONITOR_LOADING,
    status  // 1 || 0
  }
}
