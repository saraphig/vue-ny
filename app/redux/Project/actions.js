import * as types from './actionTypes';
import api from '@/api';
import ErrorService from '@/services/error';

function getCurrentAreaCode(areaReducer) {
  const { areas, selectedAreaIndex } = areaReducer;
  return areas[selectedAreaIndex].areaCode;
}

// get all projects groups
export function getAllProjectsGroupsAsync() {
  return (dispatch, getState) => {
    const areaCode = getCurrentAreaCode(getState().area);
    return api.project.getAllProjectsGroups(areaCode).then(res => {
      dispatch(getAllProjectsGroupsDone(res));
    }).catch(e => {
      console.log(e);
      ErrorService.handleAPIError(e);
      dispatch(getAllProjectsGroupsError(e));
    });
  };
}

export function getAllProjectsGroupsDone(res) {
  const { data } = res;
  return {
    type: types.GET_ALL_PROJECTS_GROUPS_DONE,
    payload: data
  }
}

export function getAllProjectsGroupsError(e) {
  return {
    type: types.GET_ALL_PROJECTS_GROUPS_DONE,
    error: e
  };
}

// get worker projects groups
export function getWorkerProjectsGroupsAsync() {
  return (dispatch, getState) => {
    const areaCode = getCurrentAreaCode(getState().area);
    return api.project.getWorkerProjectsGroups(areaCode).then(res => {
      const { data } = res;
      if (data.length === 1) {
        dispatch(getProjectsByGroupAsync({
          groupId: data[0].id,
          onlyOneGroup: true
        }));
      }
      dispatch(getWorkerProjectsGroupsDone(res));
    }).catch(e => {
      console.log(e);
      ErrorService.handleAPIError(e);
      dispatch(getWorkerProjectsGroupsError(e));
    });
  };
}

export function getWorkerProjectsGroupsDone(res) {
  const { data } = res;
  return {
    type: types.GET_WORKER_PROJECTS_GROUPS_DONE,
    payload: data
  };
}

export function getWorkerProjectsGroupsError(e) {
  return {
    type: types.GET_WORKER_PROJECTS_GROUPS_ERROR,
    error: e
  };
}

// get projects by group id
export function getProjectsByGroupAsync({ groupId, type, onlyOneGroup=false}) {
  return (dispatch, getState) => {
    const areaCode = getCurrentAreaCode(getState().area);
    return api.project.getProjectsByGroup(groupId, type, areaCode).then(res => {
      dispatch(getProjectsByGroupDone(res, groupId, type, onlyOneGroup));
    }).catch(e => {
      console.log(e);
      ErrorService.handleAPIError(e);
      dispatch(getProjectsByGroupError(e));
    });
  }
}

export function getProjectsByGroupDone(res, groupId, type, onlyOneGroup) {
  const { data } = res;
  const projects = [].concat(...Object.values(data));

  return dispatch => {
    return storage.getSortingData(type, groupId).then(sortingData => {
      dispatch({
        type: onlyOneGroup ? types.GET_ONLY_ONE_GROUP_PROJECTS : types.GET_PROJECTS_BY_GROUP_DONE,
        payload: projects,
        sortingData
      })
    }).catch(e => {
      dispatch({
        type: onlyOneGroup ? types.GET_ONLY_ONE_GROUP_PROJECTS : types.GET_PROJECTS_BY_GROUP_DONE,
        payload: projects
      })
    });
  };
}

export function getProjectsByGroupError(e) {
  return {
    type: types.GET_PROJECTS_BY_GROUP_ERROR,
    error: e
  };
}

// select group
export function selectGroup(groupId) {
  return {
    type: types.SELECT_GROUP,
    groupId
  };
}

export function copySelectedProjectsFromOnlyOneGroup() {
  return { type: types.COPY_PROJECTS_FROM_ONLY_ONE_GROUP };
}

export function resetSelected() {
  return { type: types.RESET_SELECTED };
}

// 获取事项确认评价类型数据evaluation
export const getEvaluationTypeData = EvaluationTypeData => {

  return {
    type: types.GET_EVALUATION_TYPE_DATA,
    payload: EvaluationTypeData 
  }
}
export const getEvaluationType = () => {

  return dispatch => {
    return api.project.getevaluation()
      .then(res => {
          dispatch(getEvaluationTypeData(res.data));

      })
      .catch(err => {
        //alert(JSON.stringify(err.response))
        if (err.response) console.log(err.response);
        ErrorService.handleAPIError(err);
      })
  };
}
// 获取事项数据列表
export const Projectlistall = getProjectListData => {

  return {
    type: types.GET_PROJECTS_LIST_DATA,
    payload: getProjectListData
  }
}
export const getProjectlistall= (time, projectId) => {
  return dispatch => {
    return api.project.getProjectlist( time, projectId )
      .then(res => {
        //alert(JSON.stringify(res.data))
        if(res.data.data!==undefined){
          dispatch(Projectlistall(res.data.data));
        }else{
          res.data.data=[];
          dispatch(Projectlistall(res.data.data));
        }
        
      })
      .catch(err => {
        //alert(JSON.stringify(err.response))
        if (err.response) console.log(err.response);
        ErrorService.handleAPIError(err);
      })
  };
}
//更新事项状态

// 更新事项状态无评论
export const upProjectlistall= (formData) => {

  return dispatch => {
    return api.project.upProjectlist(formData)
      .then(res => {
        dispatch(getProjectlistall( res.data.time, res.data.projectId ))
      })
      .catch(err => {
        //alert(JSON.stringify(err.response))
        if (err.response) console.log(err.response);
        ErrorService.handleAPIError(err);
      })
  };
};
// 更新事项状态有评论
export const upProjectlistallp= (formData) => {
  return dispatch => {
    return api.project.upProjectlist(formData)
      .then(res => {

        dispatch(getProjectlistall( res.data.time, res.data.projectId ))
      })
      .catch(err => {
        //alert(JSON.stringify(err.response))
        if (err.response) console.log(err.response);
        ErrorService.handleAPIError(err);
      })
  };
};
//删除事项

export const delProjectlistall= (Id,time,projectid) => {
  return dispatch => {
    return api.project.delProjectlist(Id)
      .then(res => {
        //alert(JSON.stringify(res.data))
        dispatch(getProjectlistall(time,projectid))
      })
      .catch(err => {
        //alert(JSON.stringify(err.response))
        if (err.response) console.log(err.response);
        ErrorService.handleAPIError(err);
      })
  };
};