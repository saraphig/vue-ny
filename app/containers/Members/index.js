import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from './page';
import * as Actions from '@/redux/Members/actions';


class MembersContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('projectName')
    }
  }

  render() {
    return <Page {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    membersList: state.members.membersList,
    comfirmOrdersList: state.members.comfirmOrdersList
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(Actions, dispatch);
  return { actions };
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersContainer);
