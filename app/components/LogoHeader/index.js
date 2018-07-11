import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import headerBG from '@/static/images/header-bg.png';
import logo from '@/static/images/logo.png';
import styles from '@/styles';

export default class LogoHeader extends Component {
  static propTypes = {
    noLogo: PropTypes.bool
  }

  static defaultProps = {
    noLogo: false
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ this.props.noLogo ? localStyles.headerShort : localStyles.header }>
        <Image
          source={ headerBG }
          style={ localStyles.headerImg }
          resizeMode={ 'contain' }
        />
        {!this.props.noLogo && <Image
          source={ logo }
          style={ localStyles.logoImg }
          resizeMode={ 'stretch' }
        />}
      </View>
    );
  }
};

const localStyles = StyleSheet.create({
  header: {
    height: 180,
    backgroundColor: styles.colors.cActive,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  headerShort: {
    height: 140,
    backgroundColor: styles.colors.cActive,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  headerImg: {
    width: '100%',
    height: 120
  },
  logoImg: {
    position: 'absolute',
    left: 40,
    bottom: 45,
    width: 170,
    height: 30
  }
});
