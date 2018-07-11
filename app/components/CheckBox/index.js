import React from 'react';
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import styles from '@/styles';
import Icon from '../../static/iconfont/iconfont';


export default class CheckBox extends React.Component{
  static propTypes={
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    onValue: PropTypes.number,
 };

 static default = {
   checked: false
 };

  constructor(props){
     super(props);
     this.state = {
        checked: this.props.checked,
     };
  }
  componentWillReceiveProps(nextProps) {
      this.setState({
        checked: nextProps.checked
      });
  }
  onChange = () => {
     this.setState({checked:!this.state.checked}, () => {
      this.props.onChange(this.props.onValue,this.state.checked);
     });
  }
  // toggle(){
  //    console.log("checkbox被点击了");
  //    this.setState({checked:!this.state.checked});
  //    this.props.onChange(this.state.checked);    
  // }
  render() {
    var source = "nongshiguanli-danxuankuang";
    if(this.state.checked){
      source = "nongshiguanli-xiangmuxuanzhong";
    }
    var container = (
      <View style={styles.container}>
        <Icon name={source} size={16} style={styles.checkbox} color="#41A259" ></Icon>
      </View>
    );
    return (
      <TouchableHighlight ref="checkbox" onPress={() =>this.onChange()} underlayColor='white'>
        {container}
      </TouchableHighlight>
    )
  }
}