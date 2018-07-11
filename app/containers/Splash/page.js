import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import styles from '@/styles';

export default class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ localStyle.page }>
        <Text style={ localStyle.text }>Splash</Text>
        <ActivityIndicator color="#FFFFFF" size="small" />
      </View>
    )
  }

  componentDidMount() {
    const nav = this.props.navigation;

    storage.load({
      key: 'token'
    }).then(data => {
      if (data.length) {
        nav.navigate('App');
      } else {
        nav.navigate('Auth');
      }
    }).catch(e => {
      nav.navigate('Auth');
    })
  }
}

const localStyle = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: styles.colors.cActive
  },
  text: {
    color: styles.colors.cWhite
  }
});
