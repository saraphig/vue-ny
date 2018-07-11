import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '@/styles';

import {
  ActivityIndicator,
  View,
  StyleSheet,
  Animated,
  Modal,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

class Loading extends Component {
  static propTypes = {
    showLoading: PropTypes.bool,
    opacity: PropTypes.number,
    backgroundColor: PropTypes.string
  };

  static defaultProps = {
    showLoading: false,
    opacity: 0.3,
    backgroundColor: 'gray',
  };

  constructor(props) {
    super(props);
    this.state = {
      heightAnim: new Animated.Value(0),
    }
  }

  startAnimation = () => {
    this.state.heightAnim.setValue(0);
    const timing = Animated.timing;
    timing(
      this.state.heightAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start(() => this.startAnimation());
  };

  componentDidMount() {
    this.startAnimation();
  }

  render () {
    const { showLoading, opacity, backgroundColor } = this.props;

    return (
      <Modal
        visible={showLoading}
        transparent
        onRequestClose={() => {}}
      >
        <View style={[ComponentStyles.loadingContainer, { backgroundColor, opacity }]} />
        <View style={ComponentStyles.loadingView}>
          <View style={ComponentStyles.loadingContent}>
            <ActivityIndicator size="large" color={styles.colors.cActive} style={ ComponentStyles.loadingIcon } />
          </View>
        </View>
      </Modal>
    );
  }
}

const ComponentStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    width,
    height,
    position: 'absolute'
  },
  loadingView: {
    position: 'absolute',
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  loadingIcon: {
    height: 44
  }
});

export default Loading;