import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
   Alert
} from 'react-native';
import dayjs from 'dayjs';
import TheCalendar from '@/components/TheCalendar';
import ProjectItemsList from '@/components/ProjectItemsList';
import styles from '@/styles';
import CheckBox from '../../components/CheckBox/index';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window')
export default class Page extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      checkState: false,
      id: this.props.navigation.getParam('projectId'),
      projectName:this.props.navigation.getParam('projectName'),
      selectedDate: '',
      suffix:' 17:34:21.000+08:00'
    };


    this.dayChange = this.dayChange.bind(this);
    this.gotoMembersItems = this.gotoMembersItems.bind(this);
    this.checkSelectOff= this.checkSelectOff.bind(this)
    this.checkSelectOn= this.checkSelectOn.bind(this)
  }

  componentWillMount() {
    var date = new Date() ;
    var year,month,day ;
    year = date.getFullYear();
    month = date.getMonth()+1;
    day = date.getDate() ;
    var datestr= year + '-' + ( month < 10 ? ( '0' + month ) : month ) + '-' + ( day < 10 ? ( '0' + day ) : day) ;
    this.setState({
      selectedDate: datestr
    })
    const { getProjectlistall } = this.props.actions;
    getProjectlistall(datestr+this.state.suffix,this.state.id);
  }
  dayChange (day) {
    this.setState({
      selectedDate: day.dateString
    })
    let  time= day.dateString+this.state.suffix;
    const { getProjectlistall } = this.props.actions;
    getProjectlistall(time,this.state.id);
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
  gotoMembersItems(check) {
    var projectIds=this.state.id;
     
    this.props.navigation.navigate('ProjectItem',{check,projectIds});
  }
// 勾选确认项目触发
  checkSelectOff=(val,res)=>{
    const {  upProjectlistall} = this.props.actions;
    const formData={ "time":this.state.selectedDate+this.state.suffix,"checkListId":val,"projectId":this.state.id}
      if(res){
        Alert.alert(
          '提示',
          '是否确认事项',
          [
            {text: '否', style: '否'},
            {text: '是', onPress: () =>  upProjectlistall(formData)},
          ],
          { cancelable: false }
        )
      }

  }
// 去除勾选确认项目触发
  checkSelectOn=(val,res)=>{
    const {  delProjectlistall} = this.props.actions;
    if(!res){
            Alert.alert(
              '提示',
              '是否取消确认事项',
              [
                {text: '否', onPress: () => console.log('Cancel Pressed'), style: '否'},
                {text: '是', onPress: () =>  delProjectlistall(val,this.state.selectedDate+this.state.suffix,this.state.id)},
              ],
              { cancelable: false }
            )
          }
  
  }
 updateprojectdata(){

 }
  dayChange (day) {
    this.setState({
      selectedDate: day.dateString
    })
    const {  getProjectlistall} = this.props.actions;
     getProjectlistall(this.state.selectedDate,this.state.id);
  }
  render() {
    // "id": 4181,
    // "gmtCreate": "2018-06-27T17:06:05.000+08:00",
    // "userCreate": 0,
    // "userModified": 0,
    // "gmtModified": "2018-06-29T14:35:45.000+08:00",
    // "startTime": "2018-06-27T17:06:05.000+08:00",
    // "content": "天气",
    // "deleted": false,
    // "parentId": -1,
    // "evalua": 1,
    // "evaluaValue": "不合格",
    // "index": 1,
    // "areaCode": "3",
    // "templateCheckListId": 970,
    // "checkName": "管理员",
    // "check": true
  
    const  projectData = this.props.projectsListData;
    const projectDatatrue=[];
    const projectDatafalse=[];
    for (let i = 0; i < projectData.length; i++) {
      projectData[i].evalua="localStyles.bordercol"+projectData[i].evalua

      if( projectData[i].check){
        projectDatatrue.push(projectData[i])
      }else{
        projectDatafalse.push(projectData[i])
      }
    }
    return (
      <View>
        <View style={ localStyles.picker }>
        <TheCalendar
          selectedDate={ this.state.selectedDate }
          onDayChange={ this.dayChange }
        />
        </View>
     
        <View style={localStyles.wrapper}>
        <Swiper style={localStyles.wrapper} >
          <View style={localStyles.slide}>
                <ScrollView style={localStyles.project}>
                
                <Text style={localStyles.projectstate}>待确认事项&nbsp;{projectDatafalse.length}</Text>
                  <FlatList 
                data={projectDatafalse}
                renderItem={({item}) => 
                <View style={localStyles.projectItme} >
                <TouchableHighlight onPress={() => this.gotoMembersItems(item)} underlayColor='#F9FBF9' style={localStyles.projectTitleclick}>
                <View style={localStyles.projectTitle}>
                  <Text style={[localStyles.projectTitleBorder,item.evalua]} ></Text>
                  <Text style={localStyles.projectTitleText}>{item.content}</Text>
                </View>
                </TouchableHighlight>
                  <View style={localStyles.projectCheck}>
                  <CheckBox style={localStyles.projectCheckBox}  onValue={item.id} onChange={this.checkSelectOff}/></View>
                </View>
              }
              />
              </ScrollView> 
          </View>
          <View style={localStyles.slide}>
               <ScrollView style={localStyles.project}>
                
                <Text style={localStyles.projectstate}>已确认事项&nbsp;{projectDatatrue.length}</Text>
                  <FlatList 
                data={projectDatatrue}
                
                renderItem={({item}) => 
                <View style={[localStyles.projectItme,localStyles.opacity]}>
               <TouchableHighlight  onPress={() => this.gotoMembersItems(item)}   underlayColor='#F9FBF9' style={localStyles.projectTitleclick}>
                <View style={localStyles.projectTitle}>
                  <Text style={[localStyles.projectTitleBorder,localStyles.gray]}></Text>
                  <Text style={localStyles.projectTitleText}>{item.content}</Text>
                </View>
                </TouchableHighlight>
                <View style={localStyles.projectCheck}>
                <CheckBox style={localStyles.projectCheckBox} checked='true' onValue={item.checkListLogId}  onChange={this.checkSelectOn}/></View>
                </View>
              }
              />
              </ScrollView> 
          </View>

        </Swiper>
        </View>
        
       
      </View>
    )
  }
};
const setHeight=height-200;
const setwidth=width-20;
const localStyles = StyleSheet.create({
  picker: {
    padding: 0,
    backgroundColor: styles.colors.cWhite
  },
  project: { 
    width:setwidth,
    height:setHeight,
    margin: 10,
    paddingTop:10,
    backgroundColor:"#F9FBF9",
    borderRadius:4
  },
  projectstate:{
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  projectpress:{},
  projectItme:{
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 6,
    paddingRight: 6,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#ddd",
    borderWidth: 0,
    backgroundColor:"#fff",
    borderRadius:4,
  
  },
  opacity:{opacity:0.5},
  projectTitleclick:{flex: 1,justifyContent: 'center',flexDirection:"row",},
  projectTitle:{flex: 1,flexDirection:"row",},
  projectTitleBorder:{backgroundColor:"#41A259",borderRadius:4,height:14,width:4,marginRight: 8,marginTop: 3,},
  bordercol1:{backgroundColor:"#ED495D"},
  bordercol2:{backgroundColor:"#F5A623"},
  bordercol3:{backgroundColor:"#41A259"},
  bordercol4:{backgroundColor:"#4A90E2"},
  gray:{backgroundColor:"#000"},
  // if(projectData[i].evalua==1){
  //   projectData[i].evalua="#ED495D"
  // }else if(projectData[i].evalua==2){
  //   projectData[i].evalua="#F5A623"
  // }else if(projectData[i].evalua==3){
  //   projectData[i].evalua="#41A259"
  // }else{
  //   projectData[i].evalua="#4A90E2"
  // }
  projectTitleText:{flex: 1,fontSize:14},
  projectCheck:{width:30,marginLeft:20,},
  projectCheckBox:{width:30,height:18,borderColor:"#41A259",borderRadius:4},
  wrapper: {
    height:setHeight,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
