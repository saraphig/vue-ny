import React, { Component } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '@/styles/colors';

// Component
class FormButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading || false
    };
  }

  render() {
    const isLoading = this.props.isLoading || false;

    if (isLoading) {
      return (
        <TouchableOpacity
          activeOpacity={ 1 }
          style={ styles.buttonDisabled }
        >
          <ActivityIndicator size="small" color="#FFFFFF" style={ styles.loadingIcon } />
        </TouchableOpacity>
      );
    } else if (this.props.isDisabled) {
      return (
        <TouchableOpacity
          activeOpacity={ 1 }
          style={ styles.buttonDisabled }
        >
          <Text style={ styles.textDisabled }>{ this.props.title }</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          activeOpacity={ 0.6 }
          onPress={ this.props.handlePress }
          style={ styles.button }
        >
          <Text style={ styles.text }>{ this.props.title }</Text>
        </TouchableOpacity>
      )
    }
  }
}

// PropTypes
FormButton.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired
}

// Styles
const styles = StyleSheet.create({
  button: {
    height: 44,
    alignItems: 'center',
    backgroundColor: colors.cActive,
    borderRadius: 4
  },

  buttonDisabled: {
    height: 44,
    alignItems: 'center',
    backgroundColor: 'rgba(61, 170, 118, .4)',
    borderRadius: 4
  },

  text: {
    height: 44,
    lineHeight: 44,
    fontSize: 16,
    color: colors.cWhite
  },

  textDisabled: {
    height: 44,
    lineHeight: 44,
    color: 'rgba(255, 255, 255, .6)'
  },

  loadingIcon: {
    height: 44
  }
})

export default FormButton;
