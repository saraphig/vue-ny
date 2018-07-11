import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '@/static/iconfont/iconfont';
import styles from '@/styles';

export default class ManagementAreaSelector extends Component {
  static propTypes = {
    areas: PropTypes.arrayOf(PropTypes.object).isRequired,
    index: PropTypes.number.isRequired,
    onSelect: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.handleToggleShow = this.handleToggleShow.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleToggleShow() {
    if (this.props.areas.length > 1) {
      this.setState({
        show: !this.state.show
      })
    }
  }

  handleSelect(areaId) {
    this.props.onSelect(areaId);
    this.setState({ show: false });
  }

  render() {
    return (
      <View style={ localStyles.selector }>
        <TouchableOpacity
          onPress={ this.handleToggleShow }
          style={ localStyles.selected }>
          <Text style={ localStyles.selectedText }>{this.props.areas[this.props.index].idName}</Text>
          {!this.state.show && this.props.areas.length > 1 && <Icon name='xiangmuxuanze-zhankai' size={14} color={styles.colors.cWhite} />}
          {this.state.show && this.props.areas.length > 1 && <Icon name='xiangmuxuanze-shouqi' size={14} color={styles.colors.cWhite} />}
        </TouchableOpacity>

        {this.state.show && this.props.areas.length > 1 &&
          <View style={ localStyles.itemsListCont }>
            <ScrollView style={ localStyles.itemsList }>
            {this.props.areas.map((i, idx) =>
              <TouchableOpacity
                onPress={ () => this.handleSelect(i.id) }
                key={idx}
                style={ localStyles.item }>
                <Icon name='xiangmuxuanzeicon' size={18} color={ this.props.index === idx ? styles.colors.cActive : styles.colors.cGray } />
                <Text style={ this.props.index === idx ? localStyles.itemTextActive : localStyles.itemText }>{ i.idName }</Text>
              </TouchableOpacity>
            )}
            </ScrollView>
          </View>}
      </View>
    );
  }
};

const { height } = Dimensions.get('window');
const localStyles = StyleSheet.create({
  selector: {
    marginTop: -96,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 24,
  },
  selected: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32
  },
  selectedText: {
    fontSize: 24,
    color: styles.colors.cWhite,
    marginRight: 10
  },
  itemsListCont: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    zIndex: 2,
    left: -12,
    top: 56,
    right: -12,
    height: height - 180
  },
  itemsList: {
    position: 'absolute',
    width: '100%',
    maxHeight: 264,   // show 5 complete item and half to tell scrollable
    zIndex: 3,
    backgroundColor: styles.colors.cWhite
  },
  item: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: styles.colors.cWhite,
    borderBottomWidth: 1,
    paddingLeft: 12,
    paddingRight: 12,
    borderBottomColor: styles.colors.cLiteGray
  },
  itemText: {
    marginLeft: 8
  },
  itemTextActive: {
    marginLeft: 8,
    color: styles.colors.cActive
  }
});
