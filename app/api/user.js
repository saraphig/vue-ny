import md5 from 'md5';
import base from './base';

export default {
  phoneRegistered(phone) {
    return base.get('auth-server/user/existsByCode', {
      params: { loginCode: phone }
    });
  },

  signIn(phone, password) {
    return base.post('auth-server/user/login', {
      password: md5(password),
      userCode: phone,
      userTypeId: 0
    })
  },

  userRightsCheck(code) {
    return storage.load({
      key: 'token'
    }).then(token => {
      return base.get(`devicerights/v1/actions/is-action?code=${code}`, {
        headers: { 'API-TOKEN': token }
      });
    });
  }
}
