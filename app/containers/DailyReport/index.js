import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '@/redux/DailyReport/actions';
import Page from './page';
import Icon from '@/static/iconfont/iconfont';
import styles from '@/styles';
import dayjs from 'dayjs';

import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

class DailyReportContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '新增日报',
      headerTitleStyle: {
        marginLeft: 0
      },
      headerLeft: (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.getParam('updateListDateCurrent')('');   //更新列表当前选中日期
            Alert.alert(
              '提示',
              '有未保存的内容，是否保存',
              [
                {text: '否', onPress: () => navigation.goBack(), style: 'cancel'},
                {text: '是', onPress: navigation.getParam('createDailyReport')},
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
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.getParam('updateListDateCurrent')('');   //更新列表当前选中日期
              Alert.alert(
                '提示',
                '有未保存的内容，是否保存',
                [
                  {text: '否', onPress: () => navigation.navigate('DailyReportList'), style: 'cancel'},
                  {text: '是', onPress: navigation.getParam('createDailyReport')},
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 10 }}>列表</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={navigation.getParam('createDailyReport')}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 10 }}>保存</Text>
          </TouchableOpacity>
        </View>
      ),
    }
  };

  componentWillMount() {
    this.props.navigation.setParams({
      createDailyReport: this.createDailyReport,
      updateListDateCurrent: this.props.actions.updateListDateCurrent
    });
  }

  createDailyReport = () => {
    const { createDailyReport } = this.props.actions;
    const createDailyReportState = this.props.createDailyReport;
    if (createDailyReport) {
      if (createDailyReportState.content === '') {
        Alert.alert(
          '提示',
          '工作内容不能为空',
          [
            {text: '确定', onPress: () => {}} ,
          ],
          { cancelable: false }
        );
      } else {
        createDailyReport(this.props.createDailyReport, dayjs().format('YYYY-MM-DD')).then((res) => {
          this.props.navigation.navigate('DailyReportList');
        });
      }
    }
  };

  render() {
    return <Page { ...this.props } />;
  }
}

const mapStateToProps = (state) => {
  const createDailyReport = state.dailyReport.createDailyReport;
  return { createDailyReport };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(Actions, dispatch);
  return { actions };
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyReportContainer);
