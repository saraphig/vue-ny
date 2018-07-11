import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '@/redux/DailyReport/actions';
import Page from './page';
import Icon from '@/static/iconfont/iconfont';
import styles from '@/styles';

import {
  Alert,
  Text,
  TouchableOpacity
} from 'react-native';

class DailyReportEditContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '编辑日报',
      headerTitleStyle: {
        marginLeft: 0
      },
      headerLeft: (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            Alert.alert(
              '提示',
              '有未保存的内容，是否保存',
              [
                {text: '否', onPress: navigation.getParam('customeGoBack'), style: 'cancel'},
                {text: '是', onPress: navigation.getParam('updateDailyReport')},
              ],
              { cancelable: false }
            );
          }}
        >
          <Icon
            name='daohanglan-fanhui'
            size={24} color={styles.colors.cWhite}
            style={{marginLeft: 15}}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={navigation.getParam('updateDailyReport')}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 10 }}>保存</Text>
        </TouchableOpacity>
      ),
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({
      updateDailyReport: this.updateDailyReport,
      customeGoBack: this.customeGoBack
    });
  }

  updateDailyReport = () => {
    const { updateDailyReport, getDailyReportList, updateListDateCurrent } = this.props.actions;
    const { dailyReportCurrent } = this.props;
    if (updateDailyReport) {
      updateListDateCurrent('');
      if (dailyReportCurrent.content === '') {
        Alert.alert(
          '提示',
          '工作内容不能为空',
          [
            {text: '确定', onPress: () => {}} ,
          ],
          { cancelable: false }
        );
      } else {
        updateDailyReport(dailyReportCurrent).then(() => {
          if (getDailyReportList) {
            getDailyReportList({ pageNo: 1, pageSize: 10, startTime: '', endTime: '' });
          }
          this.props.navigation.navigate('DailyReportList');
        });
      }
    }
  };

  customeGoBack = () => {
    const { getDailyReportList, updateListDateCurrent } = this.props.actions;
    if (getDailyReportList) {
      getDailyReportList({ pageNo: 1, pageSize: 10, startTime: '', endTime: '' });
      updateListDateCurrent('');
      this.props.navigation.goBack();
    }
  };

  render() {
    return <Page { ...this.props } />;
  }
}

const mapStateToProps = (state) => {
  return {
    dailyReportCurrent: state.dailyReport.dailyReportCurrent,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(Actions, dispatch);
  return { actions };
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyReportEditContainer);
