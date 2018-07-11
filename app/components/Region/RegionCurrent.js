import React, { Component } from 'react';
import ReactNative, {StyleSheet} from 'react-native';
import styles from '@/styles';
import Icon from '@/static/iconfont/iconfont';

const {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} = ReactNative;

const { width } = Dimensions.get('window');
const deviceWidth = width;

export default class RegionCurrent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onPressRegionCurrent = () => {
    this.props.navigation.navigate('RegionSearch');
  };

  render() {
    if (this.props.region !== undefined) {
      let { regionCurrent } = this.props.region;
      let city, idName;
      if (regionCurrent === undefined) {
        city = '';
        idName = '';
      } else {
        city = regionCurrent.city;
        idName = regionCurrent.idName;
      }
      return(
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this._onPressRegionCurrent()}
          style={ComponentStyles.regionCurrentContainer}>
          <View style={ComponentStyles.leftContent}>
            <Icon
              name='shouye_dingwei'
              size={20}
              color={styles.colors.cActive}
            />
            <Text style={ComponentStyles.city}>{city}</Text>
          </View>
          <Text style={ComponentStyles.text} numberOfLines={1}>{idName}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }
}


const ComponentStyles = StyleSheet.create({
  regionCurrentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: deviceWidth,
    height: 40,
    backgroundColor: styles.colors.cWhiteGray,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 20
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: styles.colors.cBlack
  },
  city: {
    width: 100,
    fontSize: 14,
    color: styles.colors.cGray,
    marginRight: 20
  },
  text: {
    width: deviceWidth - 175,
    fontSize: 14,
    color: styles.colors.cGray,
    marginRight: 20,
    textAlign: 'right'
  },
});