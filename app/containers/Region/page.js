import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import styles from '@/styles';

import RegionCurrent from '../../components/Region/RegionCurrent';
import MonitorList from '../../components/Region/MonitorList';

export default class Page extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getRegionCurrent } = this.props.regionActions;

    getRegionCurrent();
  }

  shouldComponentUpdate(nextProps) {
    const { areaCode } = this.props.region.regionCurrent;
    if (nextProps.region.regionCurrent && areaCode !== nextProps.region.regionCurrent.areaCode) {
      const { getMonitorList } = this.props.regionActions;
      getMonitorList({ pageNo: 1, pageSize: 10, areaCode: nextProps.region.regionCurrent.areaCode });
    }
    return true;
  }

  render() {
    const props = this.props;
    return (
      <View style={ styles.layouts.container }>
        <RegionCurrent {...props}/>
        <MonitorList {...props}/>
      </View>
    );
  }

  componentWillMount() {
    this.props.getAllAreasAsync();
    this.props.userRightsCheck();
  }
}
