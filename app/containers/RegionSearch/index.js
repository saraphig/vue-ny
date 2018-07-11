import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RegionSearchCreators from '../../redux/RegionSearch/actions';
import { updateRegionCurrent } from '../../redux/Region/actions';
import Page from './page';

class RegionSearchContainer extends Component {
  static navigationOptions = {
    title: '地块搜索'
  }

  render() {
    return <Page { ...this.props } />;
  }
}

const mapStateToProps = (state) => {
  const { region, regionSearch } = state;
  return {
    region,
    regionSearch
  };
};

const mapDispatchToProps = (dispatch) => {
  const regionSearchActions = bindActionCreators(RegionSearchCreators, dispatch);
  const regionUpdateRegionCurrent = bindActionCreators(updateRegionCurrent, dispatch);
  return {
    regionSearchActions,
    regionUpdateRegionCurrent
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionSearchContainer);
