import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  DatePickerAndroid,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';
import { Calendar, CalendarList, LocaleConfig } from 'react-native-calendars';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styles from '@/styles';

// Calendar Config
// Localized
LocaleConfig.locales['ch'] = {
  monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  monthNamesShort: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  dayNames: ['日','一','二','三','四','五','六'],
  dayNamesShort: ['日','一','二','三','四','五','六']
};
LocaleConfig.defaultLocale = 'ch';

// Day Styles
const selectedDayStyle = {
  selected: true
};
const markedDayStyle = {
  marked: true,
  dotColor: 'orange'
};
const today = dayjs();


export default class TheCalendar extends Component {
  static propTypes = {
    selectedDate: PropTypes.string,
    hasDataDates: PropTypes.array,
    onDayChange: PropTypes.func
  }

  static defaultProps = {
    hasDataDates: [],
    selectedDate: today.format('YYYY-MM-DD')
  }

  constructor(props) {
    super(props);

    this.state = {
      viewMode: 'week',   // ['week', 'month']
      heightAnim: new Animated.Value(136)    // [136, 368]
    };

    this.changeToSelectedDay = this.changeToSelectedDay.bind(this);
  }

  changeToSelectedDay(day=today) {
    console.log(day)
    this.props.onDayChange(day);
    this.setState({ viewMode: 'week' });
    Animated.timing(this.state.heightAnim, { toValue: 136 }).start();
  }

  makeMarkedDays() {
    const markedDates = {};
    markedDates[this.props.selectedDate] = selectedDayStyle;
    this.props.hasDataDates.forEach(d => {
      if (d === this.props.selectedDate) {
        markedDates[d] = Object.assign({}, markedDates[this.props.selectedDate], markedDayStyle);
      } else {
        markedDates[d] = markedDayStyle;
      }
    });
    return markedDates;
  }

  handleSwipeUp(gestureState) {
    this.setState({ viewMode: 'week' });
    Animated.timing(this.state.heightAnim, { toValue: 136 }).start();
  }

  handleSwipeDown(gestureState) {
    this.setState({ viewMode: 'month' });
    Animated.timing(this.state.heightAnim, { toValue: 368 }).start();
  }

  async handleOpenPicker() {
    const d = dayjs(this.props.selectedDate);
    let dy = d.year();
    let dm = d.month();
    let dd = d.date();
    const td = new Date(dy, dm, dd);

    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: td,
        mode: 'spinner'
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const gotodate = dayjs(`${year}-${month+1}-${day}`);
        const gotodated = {
          year,
          month: month+1,
          day: day,
          timestamp: gotodate.valueOf(),
          dateString: gotodate.format('YYYY-MM-DD')
        }
        this.changeToSelectedDay(gotodated);
      }
    } catch ({ code, message }) {
      console.warn('打开日历组件失败', message);
    }
  }

  render() {
    const markedDates = this.makeMarkedDays();

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 44
    };

    return (
      <View style={ localStyles.cont }>
        {this.props.selectedDate !== today.format('YYYY-MM-DD') && <TouchableOpacity style={ localStyles.todayBtn } onPress={ () => this.changeToSelectedDay() }>
          <Text style={ localStyles.todayBtnText }>今</Text>
        </TouchableOpacity>}

        <TouchableOpacity style={ localStyles.picker } onPress={ () => this.handleOpenPicker() } />

        <GestureRecognizer
          onSwipeUp={(state) => this.handleSwipeUp(state)}
          onSwipeDown={(state) => this.handleSwipeDown(state)}
          config={config}>

          <Animated.View style={{ overflow: 'hidden', height: this.state.heightAnim }}>
            <CalendarList
              horizontal={ true }
              pagingEnabled={ true }
              scrollEnabled={ true }

              viewMode={ this.state.viewMode }
              theme={{
                backgroundColor: styles.colors.cActive,
                calendarBackground: styles.colors.cActive,
                textSectionTitleColor: styles.colors.cWhite,
                selectedDayBackgroundColor: styles.colors.cWhite,
                selectedDayTextColor: styles.colors.cActive,
                todayTextColor: styles.colors.cWhite,
                dayTextColor: styles.colors.cWhite,
                textDisabledColor: 'rgba(255,255,255,0.2)',
                dotColor: '#F5A623',
                selectedDotColor: '#ffffff',
                monthTextColor: styles.colors.cWhite,
                textDayFontSize: 14,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 12
              }}
              current={ this.props.selectedDate }
              monthFormat={ 'yyyy年M月' }
              onDayPress={ (day) => this.changeToSelectedDay(day) }
              onVisibleMonthsChange={ this.props.onVisibleMonthsChange }
              markedDates={ markedDates }
            />
          </Animated.View>

        </GestureRecognizer>
      </View>
    );
  }
};

const { width, height } = Dimensions.get('window');
const localStyles = StyleSheet.create({
  cont: {
    position: 'relative'
  },
  picker: {
    position: 'absolute',
    zIndex: 10,
    width: 88,
    height: 44,
    left: width / 2 - 44,
    top: 0
  },
  todayBtn: {
    position: 'absolute',
    zIndex: 10,
    width: 44,
    height: 44,
    left: width / 2 + 36,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  todayBtnText: {
    fontSize: 12,
    width: 16,
    height: 16,
    textAlign: 'center',
    lineHeight: 16,
    color: styles.colors.cActive,
    backgroundColor: styles.colors.cWhite,
    borderRadius: 2
  },
  calendar: {
    backgroundColor: styles.colors.cActive
  },
  test: {
    width: '100%',
    height: 300,
    backgroundColor: 'red'
  }
});
