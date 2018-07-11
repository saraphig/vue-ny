/**
 *
 * Copyright 2018-present rn_nongye
 *
 */

import * as types from './actionTypes';

const initialState = {
  regionList: [
    // {key: 'aa1', areaName:'AreaName', location: 'location', company: 'company', city: 'city'},
  ],
  keyword: ''
};

export default function alarm(state = initialState, action) {
  switch (action.type) {
    case types.REGION_LIST:
      return { ...state, regionList: action.regionList };
    case types.MORE_REGION:
      return { ...state, regionList: Array.concat(state.regionList, action.regionList)};
    case types.SEARCH_KEYWORD:
      return { ...state, keyword: action.keyword };
    default:
      return state;
  }
}
