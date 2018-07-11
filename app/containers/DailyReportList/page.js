import React, { Component } from 'react';
import {
  View
} from 'react-native';
import DailyReportList from '@/components/DailyReportList';

export default class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    return (
      <View>
        <DailyReportList {...props}/>
      </View>
    );
  }
}
