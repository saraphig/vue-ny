import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '@/redux/Project/actions';
import Page from './page';



class ProjectItemContainer extends Component {
  static navigationOptions = {
    title: '确认单详情'
  }

  render() {
    return <Page { ...this.props } />;
  }
}


const mapStateToProps = (state) => {
  return {
    valuationTypeData: state.project.valuationTypeData
  };
};
const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(Actions, dispatch) };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectItemContainer);
