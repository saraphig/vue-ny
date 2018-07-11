/**
 *
 * Copyright 2018-present rn_nongye
 *
 */

import * as types from './actionTypes';

const initialState = {
    comfirmOrdersList:[],
    membersList:[]
};

export default function alarm(state = initialState, action) {
  switch (action.type) {
    case types.MEMBERS_LIST:
      return { ...state, membersList: Array.concat( state.membersList,action.membersList ) };
    case types.COMFIRM_ORDERS_LIST:
      return { ...state, comfirmOrdersList: action.comfirmOrdersList  };
    case types.COMFIRM_ORDERS_LISTS:
      return { ...state, comfirmOrdersList: []};
    default:
      return state;
  }
}
