import * as types from './actionTypes';
import api from '@/api';
import ErrorService from '@/services/error';
import { Alert } from 'react-native';

export const getDailyReportList = ({ pageNo, pageSize, startTime, endTime }) => {
  return dispatch => {
    return api.dailyReport.getDailyReportList({ pageNo, pageSize, startTime, endTime })
      .then(res => {
        dispatch(updateDailyReportList(res.data.data));
        dispatch(updateDailyReportListTotal(res.data.total));
      })
      .catch(err => {
        if (err.response) console.log(err.response);
        if (err.response && err.response.status === 400) {
          dispatch(updateDailyReportList([]));
        }
        ErrorService.handleAPIError(err);
      });
  }
};

const updateDailyReportList = dailyReportList => {
  return {
    type: types.DAILY_REPORT_LIST,
    dailyReportList
  };
};

const updateDailyReportListTotal = dailyReportListTotal => {
  return {
    type: types.UPDATE_DAILY_REPORT_LIST_TOTAL,
    dailyReportListTotal
  }
};


export const getMoreDailyReport = ({ pageNo, pageSize, startTime, endTime }) => {
  return dispatch => {
    return api.dailyReport.getDailyReportList({ pageNo, pageSize, startTime, endTime })
      .then(res => {
        if (res && res.data) {
          dispatch(moreDailyReport(res.data.data));
        } else {
          dispatch(moreDailyReport([]));
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {}
        ErrorService.handleAPIError(err);
      });
  }
};

const moreDailyReport = dailyReportList => {
  return {
    type: types.MORE_DAILY_REPORT,
    dailyReportList
  };
};

export const createDailyReport = (formData, time) => {
  return dispatch => {
    return api.dailyReport.selectIsThereADailyNewspaper(time)
      .then(res => {
        if (res.data === 0) {
          return api.dailyReport.createDailyReport( formData )
            .then(res => {
              Alert.alert(
                '提示',
                '保存成功',
                [
                  {text: '确定', onPress: () => {}},
                ],
                { cancelable: false }
              );
            })
            .catch(err => {
              ErrorService.handleAPIError(err);
            })
        }
        else {
          Alert.alert(
            '提示',
            `该日已存在日报，请勿重复添加`,
            [
              {text: '确定', onPress: () => {}},
            ],
            { cancelable: false }
          );
        }
      })
      .catch(err => {
        ErrorService.handleAPIError(err);
      })

  }
};

export const updateDailyReport = (formData) => {
  return dispatch => {
    return api.dailyReport.updateDailyReport(formData)
      .then(res => {
        Alert.alert(
          '提示',
          '保存成功',
          [
            {text: '确定', onPress: () => {}},
          ],
          { cancelable: false }
        );
      })
      .catch(err => {
        ErrorService.handleAPIError(err);
      })

  }
};

export const updateCreateDailyReportCurrent = createDailyReport => {
  return {
    type: types.CREATE_DAILY_REPORT,
    createDailyReport
  };
};

export const updateEditDailyReportCurrent = editDailyReport => {
  return {
    type: types.EDIT_DAILY_REPORT,
    editDailyReport
  };
};

export const updateDailyReportCurrent = dailyReportCurrent => {
  return {
    type: types.DAILY_REPORT_CURRENT,
    dailyReportCurrent
  };
};

export const updateListDateCurrent = listDateCurrent => {
  return {
    type: types.LIST_DATE_CURRENT,
    listDateCurrent
  };
};

export const updateListPageNo = listPageNo => {
  return {
    type: types.LIST_PAGE_NO,
    listPageNo
  };
};

export const updateDailyReportIsModify = dailyReportIsModify => {
  return {
    type: types.LIST_PAGE_NO,
    dailyReportIsModify
  };
};

export const getCurrentTime = () => {
  return dispatch => {
    return api.dailyReport.getCurrentTime()
      .then(res => {
        return res.data.time;
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {}
        ErrorService.handleAPIError(err);
      });
  }
};

