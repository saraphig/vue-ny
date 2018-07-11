import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import dayjs from 'dayjs';

export default class MyDatePicker extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: dayjs().format('YYYY-MM-DD')
    }
  }

  onDateChange = (date) => {
    const { updateListDateCurrent, getDailyReportList } = this.props;
    if (updateListDateCurrent) {
      updateListDateCurrent(date);
      getDailyReportList({ pageNo: 1, pageSize: 10, startTime: date, endTime: date });
    }
  };

  render(){
    return (
      <DatePicker
        style={{width: 30, height: 30, marginRight: 10}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="1970-05-01"
        maxDate="2019-01-01"
        confirmBtnText="确认"
        cancelBtnText="取消"
        iconSource={require('../../static/icons/report-list-date.png')}
        customStyles={{
          dateIcon: {
            width: 25,
            height: 25,
            marginLeft: 5,
            marginRight: 5,
            position: 'absolute',
            top: 3,
            resizeMode: 'stretch'
          },
          dateInput: {
            height: 0,
            width: 0,
            borderWidth: 0
          }
        }}
        onDateChange={(date) => this.onDateChange(date)}
      />
    )
  }
}