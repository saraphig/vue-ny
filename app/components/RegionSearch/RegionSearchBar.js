import React from 'react';
import PropTypes from 'prop-types'
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from '@/styles';
import Icon from '@/static/iconfont/iconfont';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

const ComponentStyles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: styles.colors.cActive,
  },
  searchBarInput: {
    flex: 1,
    color: styles.colors.cBlack,
    backgroundColor: styles.colors.cWhite,
    height: 36,
    borderRadius: 25,
    fontSize: 14,
  },
  closeIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 20
  }
});

export default class RegionSearchBar extends React.Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    autoCorrect: PropTypes.bool,
    returnKeyType: PropTypes.string,
    onSearchChange: PropTypes.func,
    onEndEditing: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    placeholder: PropTypes.string,
    padding: PropTypes.number,
    inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    iconCloseComponent: PropTypes.object,
    iconSearchComponent: PropTypes.object,
    iconBackComponent: PropTypes.object,
    iconCloseName: PropTypes.string,
    iconSearchName: PropTypes.string,
    iconBackName: PropTypes.string,
    placeholderColor: PropTypes.string,
    iconColor: PropTypes.string,
    textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    inputProps: PropTypes.object,
    onBackPress: PropTypes.func,
    alwaysShowBackButton: PropTypes.bool,
  };

  static defaultProps = {
    onSearchChange: () => {},
    onEndEditing: () => {},
    onSubmitEditing: () => {},
    inputStyle: {},
    iconCloseName: 'sousuo_shanchu',
    iconSearchName: 'sousuo',
    iconBackName: 'sousuo_shanchu',
    placeholder: 'Search...',
    returnKeyType: 'search',
    padding: 0,
    placeholderColor: '#bdbdbd',
    iconColor: styles.colors.cGray,
    textStyle: {},
    alwaysShowBackButton: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOnFocus: false,
      wait: true,
      value: ''
    };
  }

  _onClose = () => {
    this._textInput.setNativeProps({text: ''});
    this.props.onSearchChange('');
    this.setState({
      value: ''
    });
    if (this.props.onClose) {
      this.props.onClose('');
    }
  };

  _onSearchChange = (value) => {
    this.props.onSearchChange(value);
    this.setState({
      value
    })
  };

  _onFocus = () => {
    this.setState({isOnFocus: true});
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  _onBlur = () => {
    this.setState({isOnFocus: false});
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this._dismissKeyboard();
  };

  _dismissKeyboard = () => {
    dismissKeyboard();
  };

  _backPressed() {
    dismissKeyboard();
    if(this.props.onBackPress) {
      this.props.onBackPress()
    }
  }

  setText(text, focus) {
    this._textInput.setNativeProps({ text: text });
    if (focus) {
      this._onFocus();
    }
  }

  render() {
    const {
      height,
      autoCorrect,
      returnKeyType,
      onSearchChange,
      placeholder,
      padding,
      inputStyle,
      iconColor,
      iconCloseComponent,
      iconSearchComponent,
      iconBackComponent,
      iconBackName,
      iconSearchName,
      iconCloseName,
      placeholderColor,
      textStyle,
    } = this.props;

    let { iconSize, iconPadding } = this.props;

    iconSize = typeof iconSize !== 'undefined' ? iconSize : height * 0.5;
    iconPadding = typeof iconPadding !== 'undefined' ? iconPadding : height * 0.25;

    return (
      <View
        onStartShouldSetResponder={this._dismissKeyboard}
        style={{padding: padding}}
      >
        <View
          style={
            [
              ComponentStyles.searchBar,
              {
                height: height,
                paddingHorizontal: iconPadding
              },
              inputStyle
            ]
          }
        >
          <TextInput
            autoCorrect={autoCorrect === true}
            ref={c => this._textInput = c}
            returnKeyType={returnKeyType}
            value={this.state.value}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            onChangeText={this._onSearchChange}
            onEndEditing={this.props.onEndEditing}
            onSubmitEditing={this.props.onSubmitEditing}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            underlineColorAndroid="transparent"
            style={
              [ComponentStyles.searchBarInput,
                {
                  paddingLeft: iconPadding,
                },
                textStyle
              ]
            }
            {...this.props.inputProps}
          />
          {
            this.state.value !== '' ?
              <View style={ComponentStyles.closeIcon}>
                <TouchableOpacity onPress={this._onClose}>
                  { iconCloseComponent ?
                    iconCloseComponent
                    :
                    <Icon
                      name={iconCloseName}
                      size={iconSize}
                      color={iconColor}
                    />
                  }
                </TouchableOpacity>
              </View>
              : null
          }
        </View>
      </View>
    );
  }
}