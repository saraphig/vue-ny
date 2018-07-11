import React, { Component } from 'react';
import ReactNative, {StyleSheet} from 'react-native';
import Icon from '@/static/iconfont/iconfont';
import dayjs from 'dayjs';
import baseStyles from '@/styles';
import colors from "../../styles/colors";

const {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Button
} = ReactNative;

export default class DailyReportList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      pageNo: 1,
      pageSize: 10
    }
  }

  componentWillMount() {
    const { getDailyReportList } = this.props.actions;
    const { listDateCurrent } = this.props;
    if (getDailyReportList) {
      getDailyReportList({ pageNo: this.state.pageNo, pageSize: 10, startTime: listDateCurrent, endTime: listDateCurrent });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  keyExtractor = (item, index) => {
    return `${item && item.id || 'id'}${index}`;
  };

  renderLabelGroup = (item) => {
    const labels = [];
    const key = `${item && item.id || 'id'}`;
    if (item && item.isAttendanceCondition === 1) {
      labels.push(
        <View key={`isAttendanceCondition${key}`} style={[styles.labelCommon, styles.labelActive]}>
          <Text style={styles.labelColor}>满勤</Text>
        </View>
      );
    } else {
      labels.push(
        <View key={`isAttendanceCondition${key}`} style={[styles.labelCommon, styles.labelError]}>
          <Text style={styles.labelColor}>未满勤</Text>
        </View>
      );
    }
    if (item && item.isErrorDetail === 1) {
      labels.push(
        <View key={`isErrorDetail${key}`} style={[styles.labelCommon, styles.labelError]}>
          <Text style={styles.labelColor}>存在失误</Text>
        </View>
      );
    } else {
      labels.push(
        <View key={`isErrorDetail${key}`} style={[styles.labelCommon, styles.labalGray]}>
          <Text style={styles.labelColor}>无失误</Text>
        </View>
      );
    }
    if (item && item.isGoodsCondition === 1) {
      labels.push(
        <View key={`isGoodsCondition${key}`} style={[styles.labelCommon, styles.labelNormal]}>
          <Text style={styles.labelColor}>有进出货</Text>
        </View>
      );
    } else {
      labels.push(
        <View key={`isGoodsCondition${key}`} style={[styles.labelCommon, styles.labalGray]}>
          <Text style={styles.labelColor}>无进出货</Text>
        </View>
      );
    }
    if (item && item.isMaterialCondition === 1) {
      labels.push(
        <View key={`isMaterialCondition${key}`} style={[styles.labelCommon, styles.labelNormal]}>
          <Text style={styles.labelColor}>有物料使用</Text>
        </View>
      );
    } else {
      labels.push(
        <View key={`isMaterialCondition${key}`} style={[styles.labelCommon, styles.labalGray]}>
          <Text style={styles.labelColor}>无物料使用</Text>
        </View>
      );
    }
    return (
      <View style={styles.labelsContainer}>
        {labels}
      </View>
    );
  };

  renderListItem = (item) => {
    let reportTitle = ' 日报';
    let reportContent = '暂无内容';
    if (item && item.time !== undefined) {
      reportTitle = dayjs(item.time).format('MM/DD') + ' 日报';
    }
    if (item && item.content !== undefined) {
      reportContent = item.content;
    }
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.onPressItem(item)}
      >
        <View style={styles.itemContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.titleIcon} />
            <Text style={styles.title}>{reportTitle}</Text>
          </View>
          <Text style={styles.content} numberOfLines={3}>{reportContent}</Text>
          {this.renderLabelGroup(item)}
        </View>
      </TouchableOpacity>
    );
  };

  renderSeparatorComponent = () => {
    return <View style={styles.separatorLine}/>
  };

  onPressItem = (item) => {
    const { updateDailyReportCurrent } = this.props.actions;
    if ( updateDailyReportCurrent ) {
      updateDailyReportCurrent(item);
      this.props.navigation.navigate('DailyReportEdit');
    }
  };

  onRefresh = () => {
    this.setState({
      refreshing: true,
      pageNo: 1
    }, () => {
      const { getDailyReportList } = this.props.actions;
      const { listDateCurrent } = this.props;
      if (getDailyReportList) {
        getDailyReportList({ pageNo: this.state.pageNo, pageSize: 10, startTime: listDateCurrent, endTime: listDateCurrent })
          .then(() => {
            this.setState({
              refreshing: false
            });
          });
      }
    });
  };

  onEndReached = (info) => {
    if (info.distanceFromEnd > 0) {
      if (this.state.pageNo * this.state.pageSize < this.props.dailyReportListTotal) {
        this.setState({
          pageNo: this.state.pageNo + 1
        }, () => {
          const { getMoreDailyReport } = this.props.actions;
          const { listDateCurrent } = this.props;
          if (getMoreDailyReport) {
            getMoreDailyReport({
              pageNo: this.state.pageNo,
              pageSize: this.state.pageSize,
              startTime: listDateCurrent,
              endTime: listDateCurrent
            })
          }
        });
      }
    }
  };

  listEmptyComponent = () => {
    return (
      <View style={styles.emptyList}>
        <Icon
          style={styles.emptyIcon}
          name='zanweitianjiaquerendan'
          size={120}
          color={baseStyles.colors.cArrow}
        />
        <Text style={styles.emptyText}>暂无数据</Text>
      </View>
    )
  };

  clearData = () => {
    const { updateListDateCurrent, getDailyReportList } = this.props.actions;
    if (updateListDateCurrent) {
      updateListDateCurrent('');
      if (getDailyReportList) {
        getDailyReportList({ pageNo: this.state.pageNo, pageSize: 10, startTime: '', endTime: '' });
      }
    }
  };

  renderClearBtn = () => {
    if (this.props.listDateCurrent !== '') {
      return (
        <View style={styles.clearBtnContainer}>
          <Text>{this.props.listDateCurrent}</Text>
          <Button onPress={() => this.clearData()} title="清除"/>
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      <View>
        {this.renderClearBtn()}
        <FlatList
          style={styles.list}
          data={this.props.dailyReportList}
          keyExtractor={this.keyExtractor}
          renderItem={({item}) => this.renderListItem(item)}
          ItemSeparatorComponent={this.renderSeparatorComponent}
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
          onEndReachedThreshold={0.1}
          onEndReached={(info) => this.onEndReached(info)}
          ListHeaderComponent={() => <View style={{height: 10, backgroundColor: baseStyles.colors.cBg }}/>}
          ListFooterComponent={() => <View style={{height: 10, backgroundColor: baseStyles.colors.cBg }}/>}
          ListEmptyComponent={this.listEmptyComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    height: '100%',
    backgroundColor: baseStyles.colors.cBg,
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: baseStyles.colors.cWhite
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    borderBottomWidth: 1,
    borderColor: baseStyles.colors.cLine
  },
  titleIcon: {
    height: 10,
    width: 4,
    borderRadius: 2,
    marginHorizontal: 10,
    marginLeft: 16,
    marginRight: 8,
    backgroundColor: baseStyles.colors.cActive
  },
  title: {
    fontSize: 14,
    color: '#666666'
  },
  labelsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 1,
    borderTopColor: baseStyles.colors.cLine,
    backgroundColor: baseStyles.colors.cLabelBgColor
  },
  labelCommon: {
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: baseStyles.colors.cWhite,
    marginRight: 5,
  },
  labelActive: {
    backgroundColor: baseStyles.colors.cActive
  },
  labelError: {
    backgroundColor: baseStyles.colors.cLableError
  },
  labelNormal: {
    backgroundColor: baseStyles.colors.cLableNormal
  },
  labalGray: {
    backgroundColor: baseStyles.colors.cGray
  },
  labelColor: {
    color: baseStyles.colors.cWhite,
  },
  content: {
    marginVertical: 10,
    marginHorizontal: 16,
    lineHeight: 24,
    fontSize: 14,
    color: baseStyles.colors.cBlack
  },
  separatorLine: {
    height: 10,
    backgroundColor: baseStyles.colors.cBg,
  },
  emptyList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    paddingTop: '45%'
  },
  emptyText: {
    fontSize: 14,
    color: baseStyles.colors.cArrow
  },
  clearBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.cBg
  },
});