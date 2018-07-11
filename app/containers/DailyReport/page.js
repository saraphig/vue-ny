import React, { Component } from 'react';
import {
  View
} from 'react-native';
import styles from '@/styles';
import DailyReport from '@/components/DailyReport';

export default class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    return (
      <View>
        <DailyReport {...props}/>
      </View>
    );
  }
}
