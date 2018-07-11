import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '@/redux/Project/actions';
import Page from './page';


class ProjectsContainer extends Component {
  static navigationOptions = {
    title: '全部流程单'
  }

  render() {
    return <Page { ...this.props } />;
  }
};

const mapStateToProps = (state) => {
  return {
    selectedGroupProjects: state.project.selectedGroupProjects,
    projectsSortingData: state.project.projectsSortingData
  };
};

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(Actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
