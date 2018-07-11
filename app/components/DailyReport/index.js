import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import baseStyles from '@/styles';
import SwitchItem from './SwitchItem';
import dayjs from 'dayjs';

export default class DailyReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        content: '',
        isErrorDetail: 0,
        isAttendanceCondition: 1,
        isGoodsCondition: 0,
        isMaterialCondition: 0,
        errorDetail: '',
        attendanceCondition: '',
        goodsCondition: '',
        materialCondition: '',
        time: dayjs(),
      },
      textCount: 0
    };
  }

  initFormData = () => {
    const { updateCreateDailyReportCurrent, getCurrentTime } = this.props.actions;
    getCurrentTime().then(res => {
      const temp = this.state.formData;
      temp.time = dayjs(res);
      if (updateCreateDailyReportCurrent) {
        updateCreateDailyReportCurrent(temp);
      }
    });
  };

  componentWillMount() {
    this.initFormData();
  };

  onContentTextChange = (event) => {
    const newFormData = this.state.formData;
    newFormData.content = event.nativeEvent.text;
    this.setState({
      formData: newFormData,
      textCount: event.nativeEvent.text.length
    }, () => {
      const { updateCreateDailyReportCurrent } = this.props.actions;
      if (updateCreateDailyReportCurrent) {
        updateCreateDailyReportCurrent(this.state.formData);
      }
    });
  };

  onTextChange = (text, itemName) => {
    // 更新 formData
    const newFormData = this.state.formData;
    switch (itemName) {
      case 'isErrorDetail':
        newFormData.errorDetail = text;
        break;
      case 'isAttendanceCondition':
        newFormData.attendanceCondition = text;
        break;
      case 'isGoodsCondition':
        newFormData.goodsCondition = text;
        break;
      case 'isMaterialCondition':
        newFormData.materialCondition = text;
        break;
      default:
        break;
    }
    const { updateCreateDailyReportCurrent } = this.props.actions;
    if (updateCreateDailyReportCurrent) {
      updateCreateDailyReportCurrent(newFormData);
    }
  };

  onValueChange = (text, itemName) => {
    // 更新 formData
    const newFormData = this.state.formData;
    switch (itemName) {
      case 'isErrorDetail':
        newFormData.isErrorDetail = text ? 1 : 0;
        break;
      case 'isAttendanceCondition':
        newFormData.isAttendanceCondition = text ? 0 : 1;
        break;
      case 'isGoodsCondition':
        newFormData.isGoodsCondition = text ? 1 : 0;
        break;
      case 'isMaterialCondition':
        newFormData.isMaterialCondition = text ? 1 : 0;
        break;
      default:
        break;
    }
    const { updateCreateDailyReportCurrent } = this.props.actions;
    if (updateCreateDailyReportCurrent) {
      updateCreateDailyReportCurrent(newFormData);
    }
  };

  renderMainItems = () => {
    return (
      <View>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.contentIcon} />
            <Text style={styles.contentTitle}>今日工作</Text>
          </View>
          <TextInput
            value={this.state.formData.content}
            multiline={true}
            numberOfLines={5}
            maxLength={200}
            onChange={(event) => this.onContentTextChange(event)}
            underlineColorAndroid="transparent"
            placeholder="请输入工作内容"
            placeholderTextColor={baseStyles.colors.cLiteGray}
            style={styles.contentInput}
          />
          <Text style={styles.textCount}>{this.state.textCount + '/200'}</Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.formContainer}>
        <ScrollView style={styles.form}>
          {this.renderMainItems()}
          <SwitchItem
            key="isErrorDetail"
            itemName="isErrorDetail"
            switchTitle="工作失误及发生事故处理"
            placeholder="请输入工作失误/事故发生情况"
            value={this.state.formData.isErrorDetail === 1}
            detail={this.state.formData.errorDetail}
            onTextChange={this.onTextChange}
            onValueChange={this.onValueChange}
          />
          <SwitchItem
            key="isAttendanceCondition"
            itemName="isAttendanceCondition"
            switchTitle="满勤情况"
            placeholder="请输入部门出勤情况"
            value={this.state.formData.isAttendanceCondition === 0}
            detail={this.state.formData.attendanceCondition}
            onTextChange={this.onTextChange}
            onValueChange={this.onValueChange}
          />
          <SwitchItem
            key="isGoodsCondition"
            itemName="isGoodsCondition"
            switchTitle="进货/出货情况"
            placeholder="请输入进货及供货情况"
            value={this.state.formData.isGoodsCondition === 1}
            detail={this.state.formData.goodsCondition}
            onTextChange={this.onTextChange}
            onValueChange={this.onValueChange}
          />
          <SwitchItem
            key="isMaterialCondition"
            itemName="isMaterialCondition"
            switchTitle="申购及物资情况"
            placeholder="请输入申购及物资使用情况"
            value={this.state.formData.isMaterialCondition === 1}
            detail={this.state.formData.materialCondition}
            onTextChange={this.onTextChange}
            onValueChange={this.onValueChange}
          />
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  formContainer: {
    height: '100%',
    backgroundColor: baseStyles.colors.cBg
  },
  form: {
    padding: 10,
    height: '98.5%',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: baseStyles.colors.cLine
  },
  contentIcon: {
    height: 10,
    width: 4,
    borderRadius: 2,
    marginLeft: 16,
    backgroundColor: baseStyles.colors.cActive
  },
  contentTitle: {
    padding: 10,
    paddingLeft: 8,
    color: baseStyles.colors.cBlack
  },
  contentInput: {
    textAlignVertical: 'top',
    height: 100,
    marginHorizontal: 10,
    marginBottom: 10,
    color: baseStyles.colors.cBlack
  },
  textCount: {
    width: '100%',
    textAlign: 'right',
    padding: 3,
    color: baseStyles.colors.cGray
  }
});
