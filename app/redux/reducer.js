/**
 *
 * Copyright 2018-present rn_nongye
 *
 */

import { combineReducers } from 'redux';
import user from './User';
import area from './Area';
import region from './Region';
import regionSearch from './RegionSearch';
import monitor from './Monitor';
import dailyReport from './DailyReport';
import project from './Project';
import members from './Members';

const rootReducer = combineReducers({
  user,
  area,
  region,
  regionSearch,
  monitor,
  dailyReport,
  project,
  members
});

export default rootReducer;
