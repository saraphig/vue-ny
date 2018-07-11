import * as types from './actionTypes';
import { createReducer } from '@/utils';

const initialState = {
  workerProjectsGroups: [],
  allProjectsGroups: [],
  onlyOneWorkerGroupProjects: [],

  selectedGroupId: null,
  selectedGroupProjects: [],
  projectsListData: [],
  upprojectsListData: [],
  valuationTypeData:[],
  projectsSortingData: {
    itemOrder: []
  }
};

const projectReducer = createReducer(initialState, {
  [types.GET_WORKER_PROJECTS_GROUPS_DONE] (state, { payload }) {
    return Object.assign({}, state, { workerProjectsGroups: payload });
  },

  [types.GET_ALL_PROJECTS_GROUPS_DONE] (state, { payload }) {
    return Object.assign({}, state, { allProjectsGroups: payload });
  },

  [types.GET_ONLY_ONE_GROUP_PROJECTS] (state, { payload, sortingData }) {
    const projects = makeProjectsSorted(payload, sortingData);
    return Object.assign({}, state, { onlyOneWorkerGroupProjects: projects });
  },

  [types.GET_PROJECTS_BY_GROUP_DONE] (state, { payload, sortingData }) {
    const projects = makeProjectsSorted(payload, sortingData);
    return Object.assign({}, state, { selectedGroupProjects: projects });
  },

  [types.SELECT_GROUP] (state, { groupId }) {
    return Object.assign({}, state, { selectedGroupId: groupId });
  },

  [types.COPY_PROJECTS_FROM_ONLY_ONE_GROUP] (state) {
    const newSelectedProjects = state.onlyOneWorkerGroupProjects.map(p => p);
    return Object.assign({}, state, { selectedGroupProjects: newSelectedProjects });
  },

  [types.RESET_SELECTED] (state) {
    return Object.assign({}, state, { selectedGroupId: null, selectedGroupProjects: [] });
  },

  [types.GET_PROJECTS_LIST_DATA] (state, { payload }) {
    return Object.assign({}, state, { projectsListData: payload });
  },
  [types.GET_EVALUATION_TYPE_DATA] (state, { payload }) {
    return Object.assign({}, state, { valuationTypeData: payload });
  }
});

export default projectReducer;

function makeProjectsSorted(projects, sortingData) {
  if (!sortingData) return projects;
  const { itemOrder } = sortingData;
  if (!itemOrder || itemOrder.length === 0) return projects;

  // get extra projects
  const existedIds = itemOrder.map(i => parseInt(i.key));
  const extraProjects = projects.filter(p => !existedIds.includes(p.id));

  // sort existing projects
  const existedProjects = projects.filter(p => existedIds.includes(p.id));
  const existedProjectsIds = existedProjects.map(p => p.id);
  let sortedProjects = [];
  existedIds.forEach(i => {
    let index = existedProjectsIds.indexOf(i);
    sortedProjects.push(existedProjects[index]);
  });

  return [].concat(sortedProjects, extraProjects);
}
