import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '@/redux/DailyReport/actions';
import Page from './page';
import DatePicker from '@/components/DailyReportList/DatePicker';
import Icon from '@/static/iconfont/iconfont';
import styles from '@/styles';

import {
  View,
  TouchableOpacity
} from 'react-native';

class DailyReportListContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '日报列表',
      headerTitleStyle: {
        marginLeft: 0
      },
      headerLeft: (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.goBack()
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
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <DatePicker
            updateListDateCurrent={navigation.getParam('updateListDateCurrent')}
            getDailyReportList={navigation.getParam('getDailyReportList')}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('DailyReport')}
          >
            <Icon
              name='daohanglan-xinjianneirong'
              size={25} color={styles.colors.cWhite}
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        </View>
      ),
    }
  };

  componentWillMount() {
    this.props.navigation.setParams({
      updateListDateCurrent: this.props.actions.updateListDateCurrent,
      getDailyReportList: this.props.actions.getDailyReportList
    });
  }

  render() {
    return <Page { ...this.props } />;
  }
}

const mapStateToProps = (state) => {
  return {
    listDateCurrent: state.dailyReport.listDateCurrent,
    dailyReportList: state.dailyReport.dailyReportList,
    dailyReportListTotal: state.dailyReport.dailyReportListTotal,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(Actions, dispatch);
  return { actions };
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyReportListContainer);
