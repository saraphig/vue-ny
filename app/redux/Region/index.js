/**
 *
 * Copyright 2018-present rn_nongye
 *
 */

import * as types from './actionTypes';

const initialState = {
  monitorList: [],
  regionCurrent: {},
  monitorCurrent: {},
  showLoading: false,
  monitorListTotal: 0
};

export default function alarm(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_REGION_CURRENT:
      return { ...state, regionCurrent: action.regionCurrent };
    case types.MONITOR_LIST:
      return { ...state, monitorList: action.monitorList };
    case types.GET_MORE_MONITOR:
      return { ...state, monitorList: Array.concat(state.monitorList, action.monitorList)};
    case types.GET_MONITOR_CURRENT:
      return { ...state, monitorCurrent: action.monitorCurrent};
    case types.UPDATE_MONITOR_LIST_TOTAL:
      return { ...state, monitorListTotal: action.monitorListTotal};
    default:
      return state;
  }
}
