import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '@/redux/Monitor/actions';
import Page from './page';

class MonitorContainer extends Component {
  static navigationOptions = {
    title: '实时监控'
  }

  render() {
    return <Page { ...this.props } />;
  }
}

const mapStateToProps = (state) => {
  return { monitor: state.region.monitorCurrent };
};

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(Actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(MonitorContainer);
