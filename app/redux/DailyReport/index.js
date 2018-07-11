/**
 *
 * Copyright 2018-present rn_nongye
 *
 */

import * as types from './actionTypes';

const initialState = {
  dailyReportList: [],
  dailyReportCurrent: {},
  dailyReportListTotal: 0,
  createDailyReport: {},
  editDailyReport: {},
  listDateCurrent: '',
  listPageNo: 1,
  dailyReportIsModify: false
};

export default function alarm(state = initialState, action) {
  switch (action.type) {
    case types.DAILY_REPORT_LIST:
      return { ...state, dailyReportList: action.dailyReportList };
    case types.MORE_DAILY_REPORT:
      return { ...state, dailyReportList: state.dailyReportList.concat(action.dailyReportList)};
    case types.DAILY_REPORT_CURRENT:
      return { ...state, dailyReportCurrent: action.dailyReportCurrent};
    case types.CREATE_DAILY_REPORT:
      return { ...state, createDailyReport: action.createDailyReport};
    case types.EDIT_DAILY_REPORT:
      return { ...state, editDailyReport: action.editDailyReport};
    case types.UPDATE_DAILY_REPORT_LIST_TOTAL:
      return { ...state, dailyReportListTotal: action.dailyReportListTotal};
    case types.LIST_DATE_CURRENT:
      return { ...state, listDateCurrent: action.listDateCurrent};
    case types.LIST_PAGE_NO:
      return { ...state, listPageNo: action.listPageNo};
    case types.DAILY_REPORT_IS_MODIFY:
      return { ...state, dailyReportIsModify: action.dailyReportIsModify};
    default:
      return state;
  }
}
