import base from './base';

export default {
  getAllAreas() {
    return storage.load({
      key: 'token'
    }).then(token => {
      return base.get('devicerights/v1/areas/userid', {
        headers: { 'API-TOKEN': token }
      });
    });
  }
}
