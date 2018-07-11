import { Alert } from 'react-native';
import * as types from './actionTypes';
import { createReducer } from '@/utils';
import { STORAGE_USER } from '@/utils/constants';

const initialState = {
  phoneValid: false,
  loading: false,
  memberCheckable: false,
  workCheckable: false
};

const userReducer = createReducer(initialState, {
  [types.USER_PHONE_REGISTERED] (state, action) {
    return { ...state };
  },

  [types.USER_PHONE_REGISTERED_DONE] (state) {
    return Object.assign({}, state, { phoneValid: true });
  },

  [types.USER_PHONE_REGISTERED_ERROR] (state, { error }) {
    if (error.status === 200) {
      Alert.alert('提示', `${error.data.msg}`, [{ text: 'OK', onPress: () => {} }]);
    } else {
      Alert.alert('错误', '服务器连接失败', [{ text: 'OK', onPress: () => {} }]);
    }
    return Object.assign({}, state, { phoneValid: false });
  },

  [types.USER_SIGNIN] (state, action) {
    return { ...state };
  },

  [types.USER_SIGNIN_DONE] (state, { payload }) {
    const { token } = payload.data.result;
    storage.save({
      key: 'token',
      data: token
    });
    storage.save({
      key: STORAGE_USER,
      data: payload.data.result
    });
    return { ...state };
  },

  [types.USER_SIGNIN_ERROR] (state, { error }) {
    if (error.status === 200) {
      Alert.alert('提示', `${error.data.msg}`, [{ text: 'OK', onPress: () => {} }]);
    } else {
      Alert.alert('错误', '服务器连接失败', [{ text: 'OK', onPress: () => {} }]);
    }
    return { ...state };
  },

  [types.USER_SIGNOUT] (state, action) {
    storage.remove({ key: 'token' });
    storage.remove({ key: STORAGE_USER });
    return { ...state };
  },

  [types.USER_LOADING] (state, { status }) {
    return Object.assign({}, state, { loading: Boolean(status) });
  },

  [types.USER_WORK_RIGHTS] (state, { payload }) {
    return Object.assign({}, state, { workCheckable: payload });
  },

  [types.USER_MEMBER_RIGHTS] (state, { payload }) {
    return Object.assign({}, state, { memberCheckable: payload });
  },
});

export default userReducer;
