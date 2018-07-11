import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '@/styles/colors';

export default class SwitchItem extends Component {
  static propTypes = {
    switchTitle: PropTypes.string,
    value: PropTypes.bool,
    detail: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onValueChange: PropTypes.func,
    onTextChange: PropTypes.func,
    itemName: PropTypes.string,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    switchTitle: 'title',
    value: false
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      detail: this.props.detail,
      height: 70,
      textCount: (this.props.detail && this.props.detail.length) || 0
    };
  }

  onValueChange = () => {
    const { onValueChange } = this.props;
    this.setState({
      value: !this.state.value
    });
    if (onValueChange) {
      onValueChange(!this.state.value, this.props.itemName);
    }
  };

  onTextChange = (event) => {
    const { onTextChange } = this.props;
    this.setState({
      detail: event.nativeEvent.text,
      textCount: event.nativeEvent.text.length
    });
    if (onTextChange) {
      onTextChange(event.nativeEvent.text, this.props.itemName);
    }
  };

  onContentSizeChange(event) {
    let height = event.nativeEvent.contentSize.height;
    this.setState({ height });
  }

  renderDetail = () => {
    const { value } = this.state;
    let tempStyle = {
      borderRadius: 8,
    };
    if (value) {
      tempStyle = {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
      };

      return (
        <View style={[styles.detailContainer, tempStyle]}>
          <TextInput
            value={this.state.detail}
            onChange={(event) => this.onTextChange(event)}
            onContentSizeChange={this.onContentSizeChange.bind(this)}
            multiline={true}
            numberOfLines={3}
            maxLength={200}
            underlineColorAndroid="transparent"
            placeholder={this.props.placeholder}
            placeholderTextColor={colors.cLiteGray}
            style={[styles.detailInput, { height: Math.max(70, this.state.height) }]}
          />
          <Text style={styles.textCount}>{this.state.textCount + '/200'}</Text>
        </View>
      );
    }
    return null;
  };

  renderErrorDetail = () => {
    const { value } = this.state;
    // 控制白色背景圆角样式
    let tempStyle = {
      borderRadius: 8,
      marginBottom: 10
    };
    let thumbTintColor = colors.cWhiteGray;
    if (value) {
      tempStyle = {
        marginBottom: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomWidth: 1,
        borderColor: colors.cLine,
      };
      thumbTintColor = colors.cActive;
    }
    return (
      <View>
        <View style={[styles.formSwitchContainer, tempStyle]}>
          <View style={styles.titleContainer}>
            <View style={styles.contentIcon} />
            <Text style={styles.switchTitle}>{this.props.switchTitle}</Text>
          </View>
          <Switch
            value={this.state.value}
            onValueChange={this.onValueChange}
            onTintColor="#8FC69C"
            thumbTintColor={thumbTintColor}
            style={styles.switchButton}
          />
        </View>
        {this.renderDetail()}
      </View>
    );
  };

  render() {
    return (
      <View>
        {this.renderErrorDetail()}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  formSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  contentIcon: {
    height: 10,
    width: 4,
    borderRadius: 2,
    marginLeft: 16,
    backgroundColor: colors.cActive
  },
  switchTitle: {
    marginLeft: 8,
    color: colors.cBlack
  },
  switchButton: {
    marginRight: 10
  },
  detailContainer: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  detailInput: {
    textAlignVertical: 'top',
    paddingBottom: 10,
    color: colors.cBlack
  },
  textCount: {
    width: '100%',
    textAlign: 'right',
    padding: 3,
    color: colors.cGray
  }
});
