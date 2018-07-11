import React, { Component } from 'react';
import ReactNative, {StyleSheet} from 'react-native';
import styles from '@/styles';
import Icon from '@/static/iconfont/iconfont';

const {
  FlatList,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform
} = ReactNative;

const { width, height } = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;

export default class MonitorList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      pageNo: 1,
      pageSize: 10
    }
  }

  _keyExtractor = item => {return item.areaCode + item.id};

  _renderListItem = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this._onPressItem(item)}
        key={item.id}
      >
        <Icon
          style={ComponentStyles.playIcon}
          name='shouye_bofang'
          size={30}
          color={styles.colors.cWhite}
        />
        <View style={ComponentStyles.cellContainer}>
          <Image
            style={ComponentStyles.contentImage}
            source={require('../../static/image_background_home.jpg')}
          />
          <Text style={ComponentStyles.areaName} numberOfLines={1}>{item.areaName}</Text>
          <Text style={ComponentStyles.company}>{item.assertName === '' || item.assertName === null ? '--' : item.assertName }</Text>
        </View>
      </TouchableOpacity>
    );
  };

  _onPressItem = (item) => {
    // go to monitor detail page.
    const { getMonitorCurrent } = this.props.regionActions;
    getMonitorCurrent(item);
    this.props.navigation.navigate('Monitor');
  };

  _onRefresh = () => {
    const { getMonitorList } = this.props.regionActions;
    const { regionCurrent } = this.props.region;

    if (regionCurrent !== undefined) {
      this.setState({
        refreshing: true,
        pageNo: 1,
      }, () => {
        getMonitorList({ pageNo: this.state.pageNo, pageSize: this.state.pageSize, areaCode: regionCurrent.areaCode })
          .then(() => {
            this.setState({
              refreshing: false
            });
          });
      });
    }
  };

  _onEndReached = (info) => {
    if (info.distanceFromEnd > 0) {
      if (this.state.pageNo * this.state.pageSize < this.props.region.monitorListTotal) {
        const { getMoreMonitor } = this.props.regionActions;
        const { areaCode } = this.props.region.regionCurrent;

        getMoreMonitor(this.props.region.monitorList);

        this.setState({
          pageNo: this.state.pageNo + 1
        }, () => {
          getMoreMonitor({ pageNo: this.state.pageNo, pageSize: this.state.pageSize, areaCode });
        });
      }
    }
  };

  _listEmptyComponent = () => {
    return (
      <View style={ComponentStyles.emptyList}>
        <Icon
          style={ComponentStyles.emptyIcon}
          name='zanweitianjiaquerendan'
          size={120}
          color={styles.colors.cArrow}
        />
        <Text style={ComponentStyles.emptyText}>暂无数据</Text>
      </View>
    )
  };

  render() {
    return (
      <View style={ComponentStyles.listContainer}>
        <FlatList
          style={ComponentStyles.list}
          data={this.props.region.monitorList}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => this._renderListItem(item)}
          numColumns={2}
          refreshing={this.state.refreshing}
          onRefresh={() => this._onRefresh()}
          onEndReachedThreshold={0.1}
          onEndReached={(info) => this._onEndReached(info)}
          ListEmptyComponent={this._listEmptyComponent}
        />
      </View>
    );
  }
}

const ComponentStyles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    backgroundColor: styles.colors.cBg
  },
  list: {
    height: Platform.OS === 'ios' ? deviceHeight - 116 : deviceHeight - 138,
    marginTop: 16,
  },
  playIcon: {
    position: 'absolute',
    top: '30%',
    left: '42%',
    zIndex: 1
  },
  cellContainer: {
    flex: 1,
    flexDirection: 'column',
    width: deviceWidth / 2 - 10,
    height: deviceWidth / 2 * 0.83,
    backgroundColor: styles.colors.cWhite,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  contentImage: {
    width: '100%',
    height: '66%',
    backgroundColor: styles.colors.cGray,
  },
  areaName: {
    fontSize: 18,
    color: styles.colors.cBlack,
  },
  company: {
    fontSize: 13,
    color: styles.colors.cGray,
  },
  emptyList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyIcon: {
    paddingTop: 30
  },
  emptyText: {
    fontSize: 14,
    color: styles.colors.cArrow
  }
});
