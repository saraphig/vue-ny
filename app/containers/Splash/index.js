import React, { Component } from 'react';
import Page from './page';

class SplashContainer extends Component {
  static navigationOptions = {
    title: '嗣衡助农'
  };

  render() {
    return <Page { ...this.props } />;
  }
}

export default SplashContainer;
