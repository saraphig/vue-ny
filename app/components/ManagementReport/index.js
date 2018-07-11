import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import NavigatorService from '@/services/navigator';
import styles from '@/styles';

export default class ManagementReport extends Component {
  constructor(props) {
    super(props);

    this.gotoDailyReport = this.gotoDailyReport.bind(this);
  }

  gotoDailyReport() {
    NavigatorService.navigate('DailyReport');
  }

  render() {
    return (
      <View style={ localStyles.report }>
        <TouchableHighlight style={ localStyles.reportItem } underlayColor={ styles.colors.cWhiteGray }>
          <View style={ localStyles.reportItemCont }>
            <Image source={ require('@/static/icons/report-nsjl.png') } style={ localStyles.reportItemIcon } />
            <Text>农事记录</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={ localStyles.reportItem } underlayColor={ styles.colors.cWhiteGray }>
          <View style={ localStyles.reportItemCont }>
            <Image source={ require('@/static/icons/report-jh.png') } style={ localStyles.reportItemIcon } />
            <Text>计划</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={ localStyles.reportItem }
          underlayColor={ styles.colors.cWhiteGray }
          onPress={ this.gotoDailyReport }>
          <View style={ localStyles.reportItemCont }>
            <Image source={ require('@/static/icons/report-rb.png') } style={ localStyles.reportItemIcon } />
            <Text>日报</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={ localStyles.reportItem } underlayColor={ styles.colors.cWhiteGray }>
          <View style={ localStyles.reportItemCont }>
            <Image source={ require('@/static/icons/report-jjhb.png') } style={ localStyles.reportItemIcon } />
            <Text>紧急汇报</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
};

const localStyles = StyleSheet.create({
  report: {
    height: 80,
    backgroundColor: styles.colors.cWhite,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#137FD3'
  },
  reportItem: {
    width: '25%',
    height: 80
  },
  reportItemCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  reportItemIcon: {
    width: 32,
    height: 32,
    marginBottom: 4
  },

});
