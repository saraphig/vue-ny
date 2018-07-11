import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RegionCreators from '../../redux/Region/actions';
import * as AreaActions from '@/redux/Area/actions';
import * as UserActions from '@/redux/User/actions';
import Page from './page';

class RegionContainer extends Component {
  static navigationOptions = {
    title: '实时监测'
  }

  render() {
    return <Page { ...this.props } />;
  }
}

const mapStateToProps = (state) => {
  const { region } = state;
  return {
    region
  };
};

const mapDispatchToProps = (dispatch) => {
  const regionActions = bindActionCreators(RegionCreators, dispatch);
  return {
    regionActions,
    ...bindActionCreators(AreaActions, dispatch),
    ...bindActionCreators(UserActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegionContainer);
