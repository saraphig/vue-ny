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
import styles from '@/styles';
import headImg from '../../static/images/headimg.jpg'
//import Icon from '../../static/iconfont/iconfont';

export default class Page extends Component {
  constructor(props) {
    super(props);
  }




  _renderLabelGroupBottom = (item) => {
    const labels = [];
    let img = headImg;
    let name = item.checkName;
    let str1 = '未确认';
    let color1 = {
            backgroundColor: '#ED495D',
            borderRadius: 4,    
            marginRight:10
          }
    let str2 = '未评价';
    let color2 = {
      backgroundColor: '#dfe1df',
      borderRadius: 4,    
      marginRight:10
    };
    let fontcolor = {
            fontFamily: 'SourceHanSansCN-Normal',
            fontSize: 12,
            color: '#858785',
            marginLeft:5,
            marginRight:5,
            height:18
          };
    let borderStyle = {
      height:28,
      width:28,
      borderRadius:14,
      borderWidth:2,
      borderColor:'#d4e8d9',
      marginLeft:10
    };
    if (item.check==true) {
      str1 = '已确认';
      color1 = {
        backgroundColor: '#4A90E2',
        borderRadius: 4,    
        marginRight:10
      }
    }
    if(item.evalua==1){
      str2 = '不合格';
      color2 = {
        backgroundColor: '#ED495D',
        borderRadius: 4,    
        marginRight:10
      };
      fontcolor = {
        fontFamily: 'SourceHanSansCN-Normal',
        fontSize: 12,
        color: '#FFFFFF',
        marginLeft:5,
        marginRight:5,
        height:18
      };
    }else if(item.evalua==2){
      str2 = '合格';
      color2 = {
        backgroundColor: '#F5A623',
        borderRadius: 4,    
        marginRight:10
      };
      fontcolor = {
        fontFamily: 'SourceHanSansCN-Normal',
        fontSize: 12,
        color: '#FFFFFF',
        marginLeft:5,
        marginRight:5,
        height:18
      };
    }else if(item.evalua==3){
      str2 = '优秀';
      color2 = {
        backgroundColor: '#41A259',
        borderRadius: 4,    
        marginRight:10
      };
      fontcolor = {
        fontFamily: 'SourceHanSansCN-Normal',
        fontSize: 12,
        color: '#FFFFFF',
        marginLeft:5,
        marginRight:5,
        height:18
      };
    }
    if(item.checkName==null){
      //img = '';
      name = '';
      borderStyle = {
        height:28,
        width:28,
        borderRadius:14,
        marginLeft:10
      };


      labels.push(
        <View key={item.id} style={ localStyles.fbox }>
          <View style={ localStyles.topBox }>
            <Text style={ localStyles.topFont }>{item.content}</Text>
          </View>
          <View style={ localStyles.bottomBox }>

            <View style={ localStyles.bottomBoxLeft }>
              <View style={ color1 }>
                <Text style={ localStyles.wfont }>{str1}</Text>
              </View>
              <View style={ color2 }>
                <Text style={ fontcolor }>{str2}</Text>
              </View>
            </View>

            <View style={ localStyles.bottomBoxLeft }>
              <Text style={ localStyles.checkName }>{name}</Text>
              <View style={ borderStyle }>
                 {/* <Image style={ localStyles.headPortraitImg } source={ img }/>  */}
              </View>
            </View>
          </View>
        </View>  
      );
    }else{
      labels.push(
        <View key={item.id} style={ localStyles.fbox }>
          <View style={ localStyles.topBox }>
            <Text style={ localStyles.topFont }>{item.content}</Text>
          </View>
          <View style={ localStyles.bottomBox }>

            <View style={ localStyles.bottomBoxLeft }>
              <View style={ color1 }>
                <Text style={ localStyles.wfont }>{str1}</Text>
              </View>
              <View style={ color2 }>
                <Text style={ fontcolor }>{str2}</Text>
              </View>
            </View>

            <View style={ localStyles.bottomBoxLeft }>
              <Text style={ localStyles.checkName }>{name}</Text>
              <View style={ borderStyle }>
                 <Image style={ localStyles.headPortraitImg } source={ img }/> 
              </View>
            </View>
          </View>
        </View>  
      );
    }
    return labels
  
  };


  _keyExtractor = (item, index) => {
    return item.id+'w'
  }
    ;

  render() {
    return (
      

        <ScrollView style={ localStyles.zongBox }>
          <Text style={ localStyles.title }>确认单列表</Text>
          {/* <FlatList
            data={this.props.comfirmOrdersList}
            keyExtractor={item => item.id}
            renderItem={({item}) => this._renderLabelGroupBottom(item)}
                                    
          /> */}
               {this.props.comfirmOrdersList.map((item) =>this._renderLabelGroupBottom(item))}
        </ScrollView>
      

    )
  }
};




const localStyles = StyleSheet.create({
  picker: {
    padding: 10,
    backgroundColor: styles.colors.cWhite
  },
  memberbox:{
    margin:10,
    marginBottom:0,
  },
  member: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height:120
  },
  leftView: {
    width:113,
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
  },
  rightView:{
    width : 228,
    backgroundColor:'#F9FBF9',
  },
  name:{
    fontFamily: 'SourceHanSansCN-Medium',
    fontSize: 16,
    color: '#000000',
    textAlign: 'right',
  },
  date:{
    fontFamily: 'SourceHanSansCN-Medium',
    fontSize: 10,
    opacity: .2,
    color: '#000000',
    textAlign: 'right',
  },
  font:{
    opacity: .6,
    fontFamily: 'SourceHanSansCN-Regular',
    fontSize: 14,
    color: '#000000'
  },
  number1:{
    opacity: .1,
    fontFamily: 'SourceHanSansCN-Regular',
    fontSize: 14,
    color: '#000000'
  },
  number2:{
    fontFamily: 'SourceHanSansCN-Regular',
    fontSize: 14,
    color: '#4A90E2'
  },
  number3:{
    fontFamily: 'SourceHanSansCN-Regular',
    fontSize: 14,
    color: '#F5A623'
  },
  title:{
    opacity: .2,
    fontFamily: 'SourceHanSansCN-Regular',
    fontSize: 12,
    color: '#000000',
    margin: 10
  },
  topBox:{
    backgroundColor: '#FFFFFF',
    padding:14
  },
  topFont:{
    fontFamily: 'SourceHanSansCN-Regular',
    fontSize: 14,
    color: '#000000'   
  },
  bottomBox:{
    padding:14,
    paddingTop:10,
    paddingBottom:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomBoxLeft:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
  },
  headPortraits:{
    height:28,
    width:28,
    borderRadius:14,
    borderWidth:2,
    borderColor:'#d4e8d9',
    marginLeft:10
  },
  fbox:{
    backgroundColor: '#F9FBF9',
    borderRadius: 4,
    margin:10,
    marginTop:0
  },
  wfont:{
    fontFamily: 'SourceHanSansCN-Normal',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft:5,
    marginRight:5,
    height:18
  },
  headPortraitImg:{
    height:24,
    width:24,
    borderRadius:12
  },
  checkName:{
    opacity: .2,
    fontFamily: 'SourceHanSansCN-Regular',
    fontSize: 12,
    color: '#000000'    
  },
  zongBox:{
    marginBottom:25
  }
})
