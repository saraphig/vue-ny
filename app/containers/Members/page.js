import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Image,
  StyleSheet,
  FlatList
} from 'react-native';
import dayjs from 'dayjs';
import styles from '@/styles';
import headImg from '../../static/images/headimg.jpg'
import MembersList from '@/components/Members';
import TheCalendar from '@/components/TheCalendar';

export default class Page extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      memberslist : this.props.membersList,
      projectlist : this.props.comfirmOrdersList,
      id: this.props.navigation.getParam('projectId'),
      selectedDate: dayjs().format('YYYY-MM-DD'),
      suffix:' 17:34:21.000+08:00'
    };

    this.dayChange = this.dayChange.bind(this);
  }


  dayChange (day) {
    this.setState({
      selectedDate: day.dateString
    })
    let time = day.dateString+this.state.suffix;
    this.getList(time)
  } 


  componentDidMount(){ 

    let time = this.getBeforeDate(0)+this.state.suffix;
    this.getList(time);

  }


  //获取n天前的年-月-日
  getBeforeDate(n){
    var date = new Date() ;
    var year,month,day ;
    date.setDate(date.getDate()-n);
    year = date.getFullYear();
    month = date.getMonth()+1;
    day = date.getDate() ;
    s = year + '-' + ( month < 10 ? ( '0' + month ) : month ) + '-' + ( day < 10 ? ( '0' + day ) : day) ;
    return s ;
  }

  //获取n天前的X月X日
  getBeforeDates(n){
    var date = new Date() ;
    var year,month,day ;
    date.setDate(date.getDate()-n);
    year = date.getFullYear();
    month = date.getMonth()+1;
    day = date.getDate() ;
    s = month  + '月' + day + '日' ;
    return s ;
  }


  //获取人员列表(已用不到)
  getMembersList(time){
    let that = this;
    const { getMembers } = this.props.actions;
    getMembers(time,that.state.id)
  }

  //获取整个列表
  getList(time){
    const { getOrdersList } = this.props.actions;
    console.log(this.state.id)
    getOrdersList(time,this.state.id);
  }



  render() {
    const props = this.props;
    return (
      <View>
        <TheCalendar
          selectedDate={ this.state.selectedDate }
          onDayChange={ this.dayChange }
          onVisibleMonthsChange={ (date) => console.log('visible date changed: ', date) }
        />
        <MembersList {...props} />
      </View>

    )
  }
};




const localStyles = StyleSheet.create({

})
