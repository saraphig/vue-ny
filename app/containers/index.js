// ref: https://github.com/react-navigation/react-navigation/issues/1439
// App.js
import React, { Component } from 'react';
import { View } from 'react-native';
import NavigatorService from '@/services/navigator';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import SplashContainer from './Splash';
import SignInContainer from './SignIn';
import RegionContainer from './Region';
import RegionSearchContainer from './RegionSearch';
import MonitorContainer from './Monitor';
import ManagementContainer from './Management';
import ProjectsContainer from './Projects';
import ProjectContainer from './Project';
import ProjectItemContainer from './ProjectItem';
import MembersContainer from './Members';
import DailyReportContainer from './DailyReport';
import DailyReportListContainer from './DailyReportList';
import DailyReportEditContainer from './DailyReportEdit';
import colors from '../styles/colors';
import Icon from '@/static/iconfont/iconfont';

const navigationOptions = {
  headerStyle: {
    backgroundColor: colors.cActive,
      shadowColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0,
      shadowOpacity: 0
  },
  headerTintColor: colors.cWhite,
    headerBackTitle: '返回'
};

// Auth
const AuthNavigator = createStackNavigator({
  SignIn: { screen: SignInContainer }
}, {
  initialRouteName: 'SignIn',
  navigationOptions: {
    header: null
  }
});

// Tab: Monitor
const MonitorNavigator = createStackNavigator({
  Region: { screen: RegionContainer },
  RegionSearch: { screen: RegionSearchContainer },
  Monitor: { screen: MonitorContainer }
}, {
  initialRouteName: 'Region',
  navigationOptions: navigationOptions
});

MonitorNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return { tabBarVisible };
};


// Tab: Management
const ManagementNavigator = createStackNavigator({
  Management: { screen: ManagementContainer },
  Projects: { screen: ProjectsContainer },
  Project: { screen: ProjectContainer },
  ProjectItem: { screen: ProjectItemContainer },
  Members: { screen: MembersContainer },
  DailyReport: { screen: DailyReportContainer },
  DailyReportList: { screen: DailyReportListContainer },
  DailyReportEdit: { screen: DailyReportEditContainer }
}, {
  initialRouteName: 'Management',
  navigationOptions: navigationOptions
});

ManagementNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return { tabBarVisible };
};

const tabBarItem = (navigation, config) => {
  let iconName = '';
  switch (navigation.state.key) {
    case '实时监测':
      iconName = 'caidanlan-shishijiancemiaoxianzhuangtai';
      if (config.focused) {
        iconName = 'caidanlan-shishijiancesekuaizhuangtai';
      }
      break;
    case '农事管理':
      iconName = 'caidanlan-nongshiguanlimiaoxianzhuangtai';
      if (config.focused) {
        iconName = 'caidanlan-nongshiguanlisekuaizhuangtai';
      }
      break;
    default:
      break;
  }
  return (
    <Icon
      name={iconName}
      size={26} color={config.tintColor}
    />
  );
};

// Tabs
const AppNavigator = createBottomTabNavigator({
  '实时监测': MonitorNavigator,
  '农事管理': ManagementNavigator
}, {
  navigationOptions: ({ navigation }) => ({
    // TODO: return icon component
    tabBarIcon: (config) => tabBarItem(navigation, config),
    tabBarOptions: {
      activeTintColor: colors.cActive,
      inactiveTintColor: colors.cLiteGray,
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: colors.cWhite,
        borderTopWidth: 0
      }
    }
  })
});

const GlobalNavigator = createSwitchNavigator({
  Splash: SplashContainer,
  Auth: AuthNavigator,
  App: AppNavigator
}, {
  initialRouteName: 'Splash'
});

export default class App extends Component {
  render() {
    return (
      <GlobalNavigator
        ref={ navigatorRef => NavigatorService.setContainer(navigatorRef) }
      />
    );
  }
};
