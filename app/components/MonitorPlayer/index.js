//VlcPlayerView

import PropTypes from 'prop-types'
import React,{ Component } from 'react';
import {
    requireNativeComponent,
    View,
    Text,
    UIManager,
    findNodeHandle,
    StyleSheet
} from 'react-native';

class VideoView extends Component{
	
	constructor(props){
		super(props);

    this.full_screen = this.full_screen.bind(this);
    this.capture = this.capture.bind(this);
	}

	full_screen(){
		UIManager.dispatchViewManagerCommand(
			findNodeHandle(this),
			UIManager.VideoView.Commands.full_screen,
			null
		);
	}
	
	capture(){
		UIManager.dispatchViewManagerCommand(
			findNodeHandle(this),
			UIManager.VideoView.Commands.capture,
			null
		);
	}
	
	render(){
    return <RCTVideoView { ...this.props } />;
  };
}

var RCTVideoView = requireNativeComponent('VideoView',VideoView,{
    nativeOnly: {onChange: true}
});
module.exports = VideoView;
