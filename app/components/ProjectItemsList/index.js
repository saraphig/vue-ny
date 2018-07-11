import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import Item from './Item';

export default class ProjectItemsList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    items: [
      { text: 'hello' },
      { text: 'apple' },
      { text: 'world' }
    ]
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { items } = this.props;

    return (
      <View>
        {
          items.map((i, idx) =>
            <Item key={idx} item={i} />
          )
        }
      </View>
    );
  }
}
