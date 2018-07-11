import * as types from './actionTypes';
import { createReducer } from '@/utils';

const initialState = {
  areas: [{ idName: '选择区域' }],
  selectedAreaIndex: 0
};

const areaReducer = createReducer(initialState, {
  [types.GET_ALL_AREAS_DONE] (state, { payload }) {
    return Object.assign({}, state, { areas: payload });
  },

  [types.SELECT_AREA] (state, { areaId }) {
    const ids = state.areas.map(a => a.id);
    const index = ids.indexOf(areaId);
    return Object.assign({}, state, { selectedAreaIndex: index });
  }
});

export default areaReducer;
