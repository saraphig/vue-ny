import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '@/styles/colors';

export default class SwitchButton extends Component{
  static propTypes = {
    value: PropTypes.bool,
    onValueChange: PropTypes.func
  };

  static defaultProps = {
    value: false
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  onValueChange() {
    const { onValueChange } = this.props;
    this.setState({
      value: !this.state.value
    });
    if (onValueChange) {
      onValueChange();
    }
  };

  render() {
    return(
      <View style={[{ backgroundColor: this.state.value ? colors.cActive : colors.cWhiteGray }, styles.container]}>
        <TouchableOpacity
          activeOpacity={0.90}
          onPress={() => this.onValueChange()}
        >
          <View style={[{ marginLeft: this.state.value ? 20 : 2 }, styles.button]}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 50,
    borderRadius: 16,
    marginTop: 5
  },
  button: {
    height: 28,
    width: 28,
    marginTop: 2,
    borderRadius: 14,
    backgroundColor: 'white',
  }
});