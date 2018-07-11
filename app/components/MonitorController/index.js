import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  CameraRoll,
  Alert
} from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import PropTypes from 'prop-types';
import styles from '@/styles';
import colors from '@/styles/colors';
import Icon from '@/static/iconfont/iconfont';

class MonitorController extends Component {
  static propTypes = {
    look: PropTypes.func.isRequired,
    zoom: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.screenshot = this.screenshot.bind(this);
  }

  screenshot() {
    captureScreen({
      format: 'png'
    }).then(res => {
      CameraRoll.saveToCameraRoll(res);
      Alert.alert('提示', '保存成功', [{ text: 'OK', onPress: () => {} }]);
    }).catch(e => {
      Alert.alert('错误', '保存截屏失败', [{ text: 'OK', onPress: () => {} }]);
    })
  }

  render() {
    return (
      <View style={ localStyles.container }>
        <View style={ localStyles.zoom }>
          <TouchableHighlight
            underlayColor={ colors.cActive }
            onPressIn={ () => this.props.zoom('in') }
            onPressOut={ () => this.props.zoom('stop') }
            style={ localStyles.zoomBtn }>
            <Text style={ localStyles.zoomBtnText }>+</Text>
          </TouchableHighlight>

          <Text style={ localStyles.screenshot }>缩放</Text>

          <TouchableHighlight
            underlayColor={ colors.cActive }
            onPressIn={ () => this.props.zoom('out') }
            onPressOut={ () => this.props.zoom('stop') }
            style={ localStyles.zoomBtn }>
            <Text style={ localStyles.zoomBtnText }>-</Text>
          </TouchableHighlight>
        </View>

        <View style={ localStyles.menu }>
          <TouchableHighlight
            underlayColor={ colors.cActive }
            onPressIn={ () => this.props.look('up') }
            onPressOut={ () => this.props.look('stop') }
            style={[ localStyles.btn, localStyles.up ]}>
            <Icon
              name='bofangye_yaokongqiup'
              size={18} color={ '#666666' }
              style={ localStyles.upIcon }
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={ colors.cActive }
            onPressIn={ () => this.props.look('right') }
            onPressOut={ () => this.props.look('stop') }
            style={[ localStyles.btn, localStyles.right ]}>
            <Icon
              name='bofangye_yaokongqiright'
              size={18} color={ '#666666' }
              style={ localStyles.upIcon }
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={ colors.cActive }
            onPressIn={ () => this.props.look('down') }
            onPressOut={ () => this.props.look('stop') }
            style={[ localStyles.btn, localStyles.down ]}>
            <Icon
              name='bofangye_yaokongqidown'
              size={18} color={ '#666666' }
              style={ localStyles.upIcon }
            />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={ colors.cActive }
            onPressIn={ () => this.props.look('left') }
            onPressOut={ () => this.props.look('stop') }
            style={[ localStyles.btn, localStyles.left ]}>
            <Icon
              name='bofangye_yaokongqileft'
              size={18} color={ '#666666' }
              style={ localStyles.upIcon }
            />
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={ colors.cActive }
            onPress={ this.screenshot }
            style={[ localStyles.btn, localStyles.center ]}>
            <Text style={ localStyles.screenshot }>截屏</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 30
  },

  zoom: {
    width: 50,
    height: 200,
    borderWidth: 1,
    borderColor: 'rgb(238,238,238)',
    borderRadius: 25,
    marginRight: 50,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden'
  },

  zoomBtn: {
    overflow: 'hidden',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  zoomBtnText: {
    fontSize: 24,
    color: '#666666'
  },

  menu: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgb(238,238,238)'
  },

  btn: {
    overflow: 'hidden',
    width: 100,
    height: 100,
    // borderColor: 'rgb(238,238,238)',
    // borderRightWidth: 1,
    backgroundColor: colors.cWhite,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 3,
  },

  up: {
    top: -22,
    left: 50,
    transform: [{ rotate: '45deg' }]
  },
  down: {
    left: 50,
    bottom: -22,
    transform: [{ rotate: '45deg' }]
  },
  right: {
    top: 50,
    right: -22,
    transform: [{ rotate: '45deg' }],
  },
  left: {
    top: 50,
    left: -22,
    transform: [{ rotate: '45deg' }],
  },
  upIcon: {
    transform: [{ rotate: '-45deg' }]
  },
  center: {
    top: 60,
    left: 60,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgb(238,238,238)',
    borderStyle: 'solid',
    backgroundColor: colors.cWhite,
    zIndex: 4
  },

  screenshot: {
    fontSize: 14,
    color: '#444444'
  }
})

export default MonitorController;
