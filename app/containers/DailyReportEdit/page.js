import React, { Component } from 'react';
import {
  View
} from 'react-native';
import styles from '@/styles';
import DailyReportEdit from '@/components/DailyReportEdit';

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  render() {
    const props = this.props;
    return (
      <View>
        <DailyReportEdit {...props}/>
      </View>
    );
  }
}
