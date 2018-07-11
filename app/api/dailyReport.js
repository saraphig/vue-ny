import base from './base';

export default {
  getDailyReportList({ pageNo, pageSize, startTime, endTime }) {
    return storage.load({
      key: 'token'
    })
      .then( token => {
        return base.get(`agriculture/v1/dailys?status=1`, {
          params: { pageNo, pageSize, startTime, endTime },
          headers: {
            'API-TOKEN': token
          }
        });
      });
  },

  createDailyReport(formData) {
    return storage.load({
      key: 'token'
    })
      .then( token => {
        return base.post(`agriculture/v1/dailys`, formData, {
          params: formData,
          headers: {
            'API-TOKEN': token
          }
        });
      });
  },

  updateDailyReport(formData) {
    return storage.load({
      key: 'token'
    })
      .then( token => {
        return base.put(`agriculture/v1/dailys`, formData, {
          params: formData,
          headers: {
            'API-TOKEN': token
          }
        });
      });
  },

  selectIsThereADailyNewspaper(time) {
    return storage.load({
      key: 'token'
    })
      .then( token => {
        return base.get(`agriculture/v1/dailys/selectIsThereADailyNewspaper`, {
          params: { time },
          headers: {
            'API-TOKEN': token
          }
        });
      });
  },

  getCurrentTime() {
    return storage.load({
      key: 'token'
    })
      .then( token => {
        return base.delete(`agriculture/v1/dailys/getCurrentTime`, {
          headers: {
            'API-TOKEN': token
          }
        });
      });
  }
}
