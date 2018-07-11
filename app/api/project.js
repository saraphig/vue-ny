import base from './base';

export default {
  getAllProjectsGroups(areaCode) {
    return storage.load({
      key: 'token'
    }).then(token => {
      return base.get(`agriculture/v1/projectGroups?areaCode=${areaCode}`, {
        headers: { 'API-TOKEN': token }
      });
    });
  },

  getWorkerProjectsGroups(areaCode) {
    return storage.load({
      key: 'token'
    }).then(token => {
      return base.get(`agriculture/v1/projectGroups/jsg?areaCode=${areaCode}`, {
        headers: { 'API-TOKEN': token }
      });
    });
  },

  getProjectsByGroup(groupId, type, areaCode) {
    return storage.load({
      key: 'token'
    }).then(token => {
      if (type === 'members') {
        return base.get(`agriculture/v1/projects/byid?projectGroupId=${groupId}&areaCode=${areaCode}`, {
          headers: { 'API-TOKEN': token }
        });
      } else if (type === 'projects') {
        return base.get(`agriculture/v1/projects/byid/jsg?projectGroupId=${groupId}&areaCode=${areaCode}`, {
          headers: { 'API-TOKEN': token }
        });
      }
    });
  },
    getProjectlist( time, projectId ){
    return storage.load({
        key: 'token'
    })
        .then( token => {
            return base.get(`agriculture/v1/projectCheckLists`, {
                params: { pageSize:80, time, projectId },
                headers: {
                'API-TOKEN': token
                }
            });
        });  
  },
  getevaluation( ){
    return storage.load({
        key: 'token'
    })
        .then( token => {
            return base.get(`agriculture/v1/checklistlogs/scores`, {
                params: {},
                headers: {
                'API-TOKEN': token
                }
            });
        });  
  },
  upProjectlist(formData)  {
    return storage.load({
      key: 'token'
    })
      .then( token => {
        return base.post(`agriculture/v1/checklistlogs`, formData, {
          params: formData,
          headers: {
            'API-TOKEN': token
          }
        });
      });
  },
   delProjectlist(id)  {
    return storage.load({
      key: 'token'
    })
      .then( token => {
        return base.delete(`agriculture/v1/checklistlogs/`+id, {
          headers: {
            'API-TOKEN': token
          }
        });
      });
  },
};
