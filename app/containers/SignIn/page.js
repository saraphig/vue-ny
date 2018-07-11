import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import LogoHeader from '@/components/LogoHeader';
import FormButton from '@/components/FormButton';
import styles from '@/styles';
import { debounce } from '@/utils';

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      password: ''
    };

    this.handlePress = this.handlePress.bind(this);
    this.handlePhoneInput = this.handlePhoneInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  handlePress() {
    this.props.actions.userSignInAsync({
      phone: this.state.phone,
      password: this.state.password
    });
  }

  handlePhoneInput(phone) {
    const cleanPhone = phone.trim();
    this.setState({ phone: cleanPhone });
    if (cleanPhone.length === 11) {
      this.props.actions.userPhoneRegisteredAsync({
        phone: cleanPhone
      });
    }
  }

  handlePasswordInput(password) {
    const cleanPassword = password.trim();
    this.setState({ password: cleanPassword });
  }

  isReadyToSignIn() {
    return Boolean(this.props.user.phoneValid &&
            this.state.phone.length &&
            this.state.password.length);
  }

  render() {
    const { form } = styles;
    const isReadyToSignIn = this.isReadyToSignIn();

    const { phoneValid } = this.props.user;
    const passLen = this.state.password.length;

    return (
      <View style={ styles.page }>
        <LogoHeader />

        <View style={ localStyles.container }>
          <View style={ localStyles.form }>
            <View style={ phoneValid ? localStyles.formRowActived : localStyles.formRow }>
              <Text style={ phoneValid ? localStyles.formLabelActived : localStyles.formLabel }>手机号</Text>
              <TextInput
                style={ localStyles.formInput }
                value={ this.state.phone }
                placeholder={ '请输入手机号' }
                underlineColorAndroid={ 'rgba(0,0,0,0)' }
                onChangeText={ (phone) => this.handlePhoneInput(phone) } />
            </View>

            <View style={ passLen ? localStyles.formRowActived : localStyles.formRow }>
              <Text style={ passLen ? localStyles.formLabelActived : localStyles.formLabel }>密　码</Text>
              <TextInput
                style={ localStyles.formInput }
                secureTextEntry={ true }
                value={ this.state.password }
                placeholder={ '请输入密码' }
                underlineColorAndroid={ 'rgba(0,0,0,0)' }
                onChangeText={ (password) => this.handlePasswordInput(password) }
              />
            </View>

            <View style={ localStyles.formButtonRow }>
              <FormButton
                isDisabled={ !isReadyToSignIn }
                isLoading={ this.props.user.loading }
                title={ '登录' }
                handlePress={ this.handlePress }
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
};

const localStyles = StyleSheet.create({
  header: {
    height: 180,
    backgroundColor: styles.colors.cActive,
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  headerImg: {
    width: '100%',
    height: 120
  },
  logoImg: {
    position: 'absolute',
    left: 40,
    bottom: 45,
    width: 160,
    height: 30
  },
  container: {
    marginTop: 34,
    marginLeft: 38,
    marginRight: 38
  },
  form: {},
  formRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
    marginBottom: 24,
  },
  formRowActived: {
    borderBottomWidth: 1,
    borderBottomColor: styles.colors.cActive,
    marginBottom: 24
  },
  formLabel: {
    color: '#000',
    fontSize: 12
  },
  formLabelActived: {
    color: styles.colors.cActive,
    fontSize: 12
  },
  formInput: {
    fontSize: 16,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 8
  },
  formButtonRow: {
    marginTop: 24
  }
});
