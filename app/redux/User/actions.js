import NavigatorService from '@/services/navigator';
import * as types from './actionTypes';
import api from '@/api';
import ErrorService from '@/services/error';
import { USER_RIGHTS_WORK_CHECK_CODE, USER_RIGHTS_MEMBER_CHECK_CODE } from '@/utils/constants';

// Phone Registered
export function userPhoneRegisteredAsync({ phone }) {
  return dispatch => {
    dispatch(userLoading({ status: 1 }));
    return api.user.phoneRegistered(phone).then(res => {
      dispatch(userPhoneRegisteredDone(res));
      dispatch(userLoading({ status: 0 }));
    }).catch(e => {
      if (e.response) console.log(e.response);
      dispatch(userPhoneRegisteredError(e));
      dispatch(userLoading({ status: 0 }));
    })
  };
}

export function userPhoneRegisteredDone(res) {
  const { data } = res;
  if (typeof data === 'string' && data.length === 0) {
    return { type: types.USER_PHONE_REGISTERED_DONE }
  } else {
    return userPhoneRegisteredError(res);
  }
}

export function userPhoneRegisteredError(e) {
  return {
    type: types.USER_PHONE_REGISTERED_ERROR,
    error: e
  }
}

// Sign In
export function userSignInAsync({ phone, password }) {
  return dispatch => {
    dispatch(userLoading({ status: 1 }));
    return api.user.signIn(phone, password).then(res => {
      dispatch(userSignInDone(res));
      dispatch(userLoading({ status: 0 }));
    }).catch(e => {
      if (e.response) console.log(e.response);
      dispatch(userSignInError(e));
      dispatch(userLoading({ status: 0 }));
    });
  };
}

export function userSignInDone(res) {
  const { data } = res;
  if (data.code === 1) {
    return userSignInError(res);
  } else if (data.code === 0) {
    NavigatorService.navigate('App');
    return {
      type: types.USER_SIGNIN_DONE,
      payload: res
    }
  }
}

export function userSignInError(e) {
  return {
    type: types.USER_SIGNIN_ERROR,
    error: e
  }
}

// Sign Out
export function userSignOut() {
  NavigatorService.navigate('Auth');
  return {
    type: types.USER_SIGNOUT
  }
}

// Others
export function userLoading({ status }) {
  return {
    type: types.USER_LOADING,
    status  // 1 || 0
  }
}

// User Type (members / work Projects checkable)
export function userRightsCheck() {
  return dispatch => {
    const workRights = api.user.userRightsCheck(USER_RIGHTS_WORK_CHECK_CODE);
    const memberRights = api.user.userRightsCheck(USER_RIGHTS_MEMBER_CHECK_CODE);

    return Promise.all([workRights, memberRights]).then(res => {
      const [workRes, memberRes] = res;

      dispatch({
        type: types.USER_WORK_RIGHTS,
        payload: workRes.data
      });

      dispatch({
        type: types.USER_MEMBER_RIGHTS,
        payload: memberRes.data
      });
    }).catch(e => {
      console.log(e.response);
      ErrorService.handleAPIError(e);
    });
  };
}
