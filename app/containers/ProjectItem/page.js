import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Alert,
  FlatList
} from 'react-native';
import styles from '@/styles';
import CheckBox from '../../components/CheckBox/index';
export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state={
      ConfirmText:'',
      evaluation:'',
      checkedlistid:'',
      id: this.props.navigation.getParam('projectIds'),
      check: this.props.navigation.getParam('check'),
      rescontent:'',
      checkres:this.props.navigation.getParam('check').check,
      checkreid:this.props.navigation.getParam('check').id,
      selectedDate: '',
      suffix:' 17:34:21.000+08:00'
    }
    this.btncheck= this.btncheck.bind(this)
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
    const { getEvaluationType } = this.props.actions;
     getEvaluationType();
  }
// 勾选确认项目触发
checkSelectOff=(val,res)=>{
  let sco=1;
  if(this.state.rescontent=="合格"){
    sco=2
  }else if(this.state.rescontent=="优秀"){
    sco=3
  }
  this.setState({checkres:res});
  this.setState({checkreid:val});
  const { upProjectlistallp} = this.props.actions;
  const formData={ "time":this.state.selectedDate+this.state.suffix,"checkListId":val,"score": sco,"projectId":this.state.id}
  // upProjectlistall
      if(res && this.state.rescontent!==''){
        Alert.alert(
          '提示',
          '是否确认事项该评价',
          [
            {text: '否', tyle: 'cancel'},
            {text: '是', onPress: () => upProjectlistallp(formData)},
          ],
          { cancelable: false }
        )
      }
    }
btncheck(value){
let sco=1;
  if(this.state.rescontent=="合格"){
    sco=2
  }else if(this.state.rescontent=="优秀"){
    sco=3
  }
  this.setState({rescontent:value});
  const { upProjectlistallp} = this.props.actions;
    const formData={ "time":this.state.selectedDate+this.state.suffix,"checkListId":this.state.checkreid,"score":sco,"projectId":this.state.id}
  if(this.state.checkres && value!==''){
    Alert.alert(
      '提示',
      '是否确认事项该评价',
      [
        {text: '否', style: 'cancel'},
        {text: '是', onPress: () => upProjectlistallp(formData)},
      ],
      { cancelable: false }
    )
  }
}

  render() {
    const  valuationData = this.props.valuationTypeData;

    console.log(valuationData)
    return (
      <View>
        <View style={localStyles.confirm}>
                <View style={localStyles.textInput}>
                  <Text>确认单内容</Text>
                </View>
                <View style={localStyles.projectItme}>
                

                <View style={localStyles.projectTitle}>
                  <Text style={localStyles.projectTitleBorder}></Text>
                  <Text style={localStyles.projectTitleText}>{this.state.check.content}</Text>
                </View>
             
                  <View style={localStyles.projectCheck}>
                  <CheckBox style={localStyles.projectCheckBox} checked={this.state.check.check} onValue={this.state.check.id}  onChange={this.checkSelectOff}/>
                  </View>
                </View>
        </View>
        <View  style={localStyles.confirm}>
        <View style={localStyles.textInput}>
                  <Text>对完成结果评价</Text>
                </View>
        <View style={localStyles.evaluation}>
        <FlatList 
          style={localStyles.evaluationrow}
                horizontal='true'
                data={valuationData}
                keyExtractor={(item, index) => index}
                renderItem={({item}) => 
               <TouchableHighlight onPress={()=> this.btncheck(item.name)} style={[localStyles.confirmBtn,localStyles.bordercol3]} >
                <Text style={[localStyles.confirmbtnText,localStyles.green]}>{item.name}</Text>
                </TouchableHighlight>
              }
              />
         

        </View>
        </View>
      </View>
      
    )
  }
};
const localStyles = StyleSheet.create({
  confirm:{
    backgroundColor:"#fff",
    marginBottom: 10,
  },
  evaluation:{
    paddingBottom: 20,
    paddingTop: 20,
    
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',

  },
  evaluationrow:{
    paddingLeft:8,
    paddingRight:8,
    flexDirection:"row"
  },
  confirmBtn:{
    width:100,
    borderWidth: 1,
    height:35,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    marginLeft:8,
    marginRight:8,
    borderRadius:4,
    borderColor:"#ED495D",color:"#ED495D"
},
confirmbtnText:{
  fontSize:15
},
  textInput:{
    height:40,
    justifyContent: 'center',
    borderBottomColor:"#979797",
    paddingLeft: 16,
    fontSize:14,
    marginBottom:0,
    borderBottomWidth: 1,

  },
  picker: {
    padding: 10,
    backgroundColor: styles.colors.cWhite
  },
  bordercol3:{borderColor:"#41A259",color:"#41A259"},
  bordercol2:{borderColor:"#F5A623",color:"#F5A623"},
  bordercol1:{borderColor:"#ED495D",color:"#ED495D"},
  projectpress:{},
  projectItme:{
    marginTop:0,
    paddingBottom: 13,
    paddingTop: 13,
    paddingLeft:16,
    paddingRight: 16,
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#ddd",
    borderWidth: 0,
    backgroundColor:"#fff",
    borderRadius:4
  },
  projectTitleclick:{flex: 1,justifyContent: 'center',flexDirection:"row",},
  projectTitle:{flex: 1,flexDirection:"row",},
  projectTitleBorder:{backgroundColor:"#41A259",borderRadius:4,height:14,width:4,marginRight: 8,marginTop: 5,},
  projectTitleText:{flex: 1,fontSize:16,color:"#000"},
  projectCheck:{width:30,marginLeft:20,},
  projectCheckBox:{width:30,height:18,borderColor:"#41A259",borderRadius:4},
})
