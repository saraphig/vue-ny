import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '@/redux/Project/actions';
import * as AreaActions from '@/redux/Area/actions';
import Page from './page';


class ManagementContainer extends Component {
  render() {
    return <Page { ...this.props } />;
  }
}

const mapStateToProps = (state) => {
  return {
    workerProjectsGroups: state.project.workerProjectsGroups,
    allProjectsGroups: state.project.allProjectsGroups,
    onlyOneWorkerGroupProjects: state.project.onlyOneWorkerGroupProjects,
    areas: state.area.areas,
    selectedAreaIndex: state.area.selectedAreaIndex,
    memberCheckable: state.user.memberCheckable,
    workCheckable: state.user.workCheckable
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      ...bindActionCreators(ProjectActions, dispatch),
      ...bindActionCreators(AreaActions, dispatch),
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagementContainer);
