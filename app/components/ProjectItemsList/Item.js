import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import NavigatorService from '@/services/navigator';


export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }

  static defaultProps = {
    item: {}
  }

  constructor(props) {
    super(props);

    this.gotoProjectItem = this.gotoProjectItem.bind(this);
  }

  gotoProjectItem() {
    NavigatorService.navigate('ProjectItem');
  }

  render() {
    return (
      <TouchableHighlight onPress={ this.gotoProjectItem }>
        <Text>{ this.props.item.text }</Text>
      </TouchableHighlight>
    )
  }
}
