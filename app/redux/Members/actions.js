import * as types from './actionTypes';
import api from '@/api';
import ErrorService from '@/services/error';


export const updateMembersList = membersList => {
    return {
      type: types.MEMBERS_LIST,
      membersList
    };
  };
  
export const updatecomfirmOrdersList = comfirmOrdersList => {
  return {
    type: types.COMFIRM_ORDERS_LIST,
    comfirmOrdersList
  };
};

export const deletecomfirmOrdersList = comfirmOrdersLists => {
  return {
    type: types.COMFIRM_ORDERS_LISTS,
    comfirmOrdersLists
  };
};

export const getOrdersList = (time, projectId) => {
  return dispatch => {
    return api.members.getComfirmOrders( time, projectId )
      .then(res => {
        //alert(JSON.stringify(res.data))
        console.log(res.data)
        if(res.data.data){
          dispatch(updatecomfirmOrdersList(res.data.data));
        }else{
          dispatch(updatecomfirmOrdersList([]));
        }
      })
      .catch(err => {
        //alert(JSON.stringify(err.response))
        if (err.response) console.log(err.response);
        ErrorService.handleAPIError(err);
      })
  };
};

export const getMembers = ({ time, projectId }) => {
  return dispatch => {
    return api.members.getMembersList({ time, projectId })
      .then(res => {
        dispatch(updateMembersList(res));
      })
      .catch(err => {
        if (err.response) console.log(err.response);
        ErrorService.handleAPIError(err);
      })
  };
};