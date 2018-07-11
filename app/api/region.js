import base from './base';

export default {
  regionDefaultGet() {
    return storage.load({
      key: 'token'
    })
      .then( token => {
        return base.get('devicerights/v1/areas/regionname', {
          headers: {
            'API-TOKEN': token
          }
        });
      })
  },

  regionSearch({ keyword, pageNo, pageSize }) {
    return storage.load({
      key: 'token'
    })
      .then( token => {
        return base.get(`devicerights/v1/areas/regionname?idName=${keyword}`, {
          params: { keyword, pageNo, pageSize },
          headers: {
            'API-TOKEN': token
          }
        });
      });
  },

  getMonitorList({ pageNo, pageSize, areaCode }) {
    return storage.load({
      key: 'token'
    })
      .then( token => {
        return base.get(`agriculture/v2/deviceinfo/list?deviceType=0003`, {
          params: { pageNo, pageSize, areaCode },
          headers: {
            'API-TOKEN': token
          }
        });
      });
  }
}
