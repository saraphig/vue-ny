import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '@/redux/Project/actions';
import Page from './page';


class ProjectsContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('projectName')
    }
  }

  render() {
    return <Page { ...this.props } />;
  }
};

const mapStateToProps = (state) => {
  return {
    selectedGroupProjects: state.project.selectedGroupProjects,
    projectsSortingData: state.project.projectsSortingData,
    projectsListData: state.project.projectsListData
  };
};

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(Actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
