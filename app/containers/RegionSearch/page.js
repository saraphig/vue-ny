import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import RegionSearchList from '../../components/RegionSearch/RegionSearchList';

export default class Page extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { getRegionList } = this.props.regionSearchActions;

    getRegionList({keyword: '', pageNo: 1, pageSize: 10});
  }

  render() {
    const props = this.props;
    return (
      <View>
        <RegionSearchList {...props}/>
      </View>
    );
  }
}
