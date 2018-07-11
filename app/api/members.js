import base from './base';

export default {
    getMembersList({ time, projectId }){
        return storage.load({
            key: 'token'
        })
            .then( token => {
                return base.get(`agriculture/v1/projects/summary`, {
                    params: { time, projectId },
                    headers: {
                    'API-TOKEN': token
                    }
                });
            });
    },
    getComfirmOrders( time, projectId ){
        return storage.load({
            key: 'token'
        })
            .then( token => {
                return base.get(`agriculture/v1/projectCheckLists`, {
                    params: { pageSize:50, time, projectId },
                    headers: {
                    'API-TOKEN': token
                    }
                });
            });  
    }
}