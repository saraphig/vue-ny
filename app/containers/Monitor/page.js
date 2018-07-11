import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Alert,
  NetInfo,
  DeviceEventEmitter,
} from 'react-native';
import { play } from 'react-native-vlc-player'
import RegionCurrent from '@/components/Region/RegionCurrent';
import MonitorPlayer from '@/components/MonitorPlayer';
import MonitorController from '@/components/MonitorController';
import styles from '@/styles';
import Icon from '@/static/iconfont/iconfont';

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: true,
      playerStatus: ''
    }

    this.look = this.look.bind(this);
    this.zoom = this.zoom.bind(this);
    this.playerRecord = this.playerRecord.bind(this);
    this.playerCapture = this.playerCapture.bind(this);
    this.playerFullScreen = this.playerFullScreen.bind(this);
  }

  look(direction) {
    this.props.actions.monitorLookAround({
      direction,
      id: this.props.monitor.deviceId
    });
  }

  zoom(to) {
    this.props.actions.monitorZoom({
      to,
      id: this.props.monitor.deviceId
    })
  }

  playerRecord() {
    Alert.alert('提示', '此功能暂未开放', [{ text: 'OK', onPress: () => {} }]);
  }

  playerCapture() {
    this.player.capture();
    Alert.alert('提示', '保存成功', [{ text: 'OK', onPress: () => {} }]);
  }

  playerFullScreen() {
    this.player.full_screen();
  }

  render() {
    return (
      <View style={ localStyles.page }>
        <RegionCurrent { ...this.props } />

        <MonitorPlayer
          ref={ player => this.player = player }
          style={ localStyles.player }
          playing={ this.state.playing }
      		url={this.props.monitor.sourceUrl}
        />

        {this.state.playerStatus.length > 0 &&
          <View style={ localStyles.playerHint }>
            <Text style={ localStyles.playerHintText }>{ this.state.playerStatus }</Text>
          </View>
        }

        <View style={ localStyles.controllerGroup }>
          <TouchableHighlight
            onPress={ this.playerRecord }
            underlayColor={ '#fff' }
            style={ localStyles.controller }>
            <View>
              <Icon
                name='bofangye_luxiangdianji'
                size={24} color={styles.colors.cArrow}
              />
              <Text>录像</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={ this.playerCapture }
            underlayColor={ '#fff' }
            style={ localStyles.controller }>
            <View>
              <Icon
                name='bofangye_paizhao'
                size={24} color={styles.colors.cArrow}
              />
              <Text>拍照</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={ this.playerFullScreen }
            underlayColor={ '#fff' }
            style={ localStyles.controller }>
            <View>
              <Icon
                name='bofangye_quanping'
                size={24} color={styles.colors.cArrow}
              />
              <Text>全屏</Text>
            </View>
          </TouchableHighlight>
        </View>

        <MonitorController
          look={ this.look }
          zoom={ this.zoom }
        />
      </View>
    );
  }

  handleVideoControll(msg) {
    const { action } = msg;
    if (action) {
      const nowplaying = this.state.playing;
      this.setState({ playing: !nowplaying });
    } else {
      Alert.alert('错误', '调用播放控制接口失败，请重试', [{ text: 'OK', onPress: () => {} }]);
    }
  }

  handleVideoError(msg) {
    const { play_error, load_ing, load_success } = msg;
    if (play_error) {
      Alert.alert('错误', '直播源播放失败，请检查网络连接', [{ text: 'OK', onPress: () => {
        this.props.navigation.goBack();
      } }]);
      this.setState({
        playerStatus: ''
      });
    }
    if (load_ing) {
      this.setState({
        playerStatus: '正在缓冲...'
      });
    }
    if (load_success) {
      this.setState({
        playerStatus: ''
      });
    }
  }

  handleConnectionChange(info) {
    console.log(info);
  }

  componentDidMount() {
    // Check Network Connection
    NetInfo.isConnected.fetch().then(res => {
      if (!res) {
        Alert.alert('错误', '无法连接监控画面，请检查网络连接', [{ text: 'OK', onPress: () => {
          this.props.navigation.goBack();
        } }]);
      }
    });
    NetInfo.addEventListener('connectionChange', info => this.handleConnectionChange(info));
    this.subVideoControll = DeviceEventEmitter.addListener('VideoControll', msg => this.handleVideoControll(msg));
    this.subVideoError = DeviceEventEmitter.addListener('VideoError', msg => this.handleVideoError(msg));
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange');
    this.subVideoControll.remove();
    this.subVideoError.remove();
  }
};

const localStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  player: {
    height: 200,
    backgroundColor: '#000000'
  },
  playerHint: {
    width: '100%',
    height: 200,
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playerHintText: {
    fontSize: 18,
    color: styles.colors.cWhite
  },
  controllerGroup: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: styles.colors.cLine,
    justifyContent: 'space-around'
  },
  controller: {
    height: 54,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
