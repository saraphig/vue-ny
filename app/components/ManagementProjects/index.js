import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import ManyGroups from './ManyGroups';
import OneGroup from './OneGroup';

export default class ManagementProjects extends Component {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object),
    projects: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    groups: [],
    projects: []
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { groups, projects } = this.props;

    if (groups.length === 1) {
      return <OneGroup projects={ projects } />;
    } else {
      return <ManyGroups groups={ groups } />;
    }

    return <View></View>;
  }
};
