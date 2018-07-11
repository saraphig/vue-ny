import React, { Component } from 'react';
import ReactNative, {StyleSheet} from 'react-native';
import styles from '@/styles';

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

import RegionSearchBar from './RegionSearchBar';
import Icon from '@/static/iconfont/iconfont';

export default class RegionSearchList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      pageNo: 1
    }
  }

  _keyExtractor = item => {return item.areaCode + item.id};

  _renderListItem = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this._onPressItem(item)}
      >
        <View style={ComponentStyles.cellContainer} >
          <View style={ComponentStyles.content}>
            <Image
              style={ComponentStyles.contentImage}
              source={require('../../static/background_search_list.png')}
            />
            <View style={ComponentStyles.contentText}>
              <Text style={ComponentStyles.areaName} numberOfLines={2}>{item.idName}</Text>
              <Text style={ComponentStyles.location} numberOfLines={1}>{item.city + '   ' + item.areaBusiness}</Text>
            </View>
          </View>
          <Icon
            name='bofangye_yaokongqiright'
            size={20} color={styles.colors.cArrow}
            style={ComponentStyles.arrowIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };

  _renderSeparatorComponent = () => {
    return <View style={ComponentStyles.separatorLine}/>
  };

  _onPressItem = (item) => {
    this.props.regionUpdateRegionCurrent(item);
    this.props.navigation.goBack();
  };

  _onRefresh = () => {
    const { keyword } = this.props.regionSearch;
    const { getRegionList } = this.props.regionSearchActions;

    this.setState({
      refreshing: true,
      pageNo: 1
    }, () => {
      getRegionList({ keyword, pageNo: this.state.pageNo, pageSize: 10 })
        .then(() => {
          this.setState({
            refreshing: false
          });
        });
    });
  };

  _onEndReached = (info) => {
    if (info.distanceFromEnd > 0) {
      const { keyword } = this.props.regionSearch;
      const { getMoreRegion } = this.props.regionSearchActions;

      this.setState({
        pageNo: this.state.pageNo + 1
      }, () => {
        getMoreRegion({ keyword, pageNo: this.state.pageNo, pageSize: 10 });
      });
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
    const { keyword } = this.props.regionSearch;
    const { updateRegionKeyword, getRegionList } = this.props.regionSearchActions;

    return (
      <View>
        <RegionSearchBar
          onSearchChange={updateRegionKeyword}
          height={54}
          onFocus={() => {}}
          onBlur={() => getRegionList({ keyword, pageNo: 1, pageSize: 10 })}
          onClose={(keyword) => getRegionList({ keyword, pageNo: 1, pageSize: 10 })}
          placeholder={'搜索'}
          autoCorrect={false}
          returnKeyType={'search'}
        />
        <FlatList
          style={ComponentStyles.areaList}
          data={this.props.regionSearch.regionList}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => this._renderListItem(item)}
          ItemSeparatorComponent={this._renderSeparatorComponent}
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
  areaList: {
    height: Platform.OS === 'ios' ? deviceHeight - 118 : deviceHeight - 142,
    paddingTop: 16,
    backgroundColor: styles.colors.cWhite
  },
  cellContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    width: deviceWidth,
    backgroundColor: styles.colors.cWhite
  },
  content: {
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  contentImage: {
    height: 50,
    width: 46,
    backgroundColor: styles.colors.cGray,
  },
  contentText: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20
  },
  areaName: {
    fontSize: 18,
    color: styles.colors.cBlack,
    width: deviceWidth - 130,
  },
  location: {
    fontSize: 13,
    color: styles.colors.cGray,
    width: deviceWidth - 130,
  },
  arrowIcon: {
    marginRight: 20,
  },
  separatorLine: {
    height: 1,
    width: deviceWidth - 40,
    marginLeft: 20,
    backgroundColor: styles.colors.cLine,
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