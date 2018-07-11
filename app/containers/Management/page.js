import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import titleBG from '@/static/images/section-bg.png';
import LogoHeader from '@/components/LogoHeader';
import ManagementAreaSelector from '@/components/ManagementAreaSelector';
import ManagementReport from '@/components/ManagementReport';
import ManagementProjects from '@/components/ManagementProjects';
import ManagementMembers from '@/components/ManagementMembers';
import styles from '@/styles';

export default class Page extends Component {
  static propTypes = {
    memberCheckable: PropTypes.bool,
    workCheckable: PropTypes.bool
  }

  static defaultProps = {
    memberCheckable: false,
    workCheckable: false
  }

  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this.handleAreaChange = this.handleAreaChange.bind(this);
  }

  handleAreaChange(areaId) {
    this.props.actions.selectArea(areaId);
    this.props.actions.getWorkerProjectsGroupsAsync();
    if (this.props.memberCheckable) this.props.actions.getAllProjectsGroupsAsync();
  }

  render() {
    const {
      memberCheckable,
      workCheckable,
      allProjectsGroups,
      workerProjectsGroups,
      onlyOneWorkerGroupProjects
    } = this.props;

    return (
      <View style={ styles.layouts.page }>
        <LogoHeader noLogo={ true } />
        
        <ManagementAreaSelector
          ref={ areaSelector => this.areaSelector = areaSelector }
          areas={ this.props.areas }
          index={ this.props.selectedAreaIndex }
          onSelect={ (areaId) => this.handleAreaChange(areaId) }
        />

        <ScrollView style={ localStyles.container }>
          <ManagementReport />

          {memberCheckable && <View style={[ localStyles.section, localStyles.members ]}>
            <ImageBackground style={ localStyles.sectionTitle } source={ titleBG }>
              <Text style={ localStyles.sectionTitleText }>成员确认情况</Text>
            </ImageBackground>
            <View style={ localStyles.sectionList }>
              <ManagementMembers groups={ allProjectsGroups } />
            </View>
          </View>}

          <View style={[ localStyles.section, localStyles.projects ]}>
            <ImageBackground style={ localStyles.sectionTitle } source={ titleBG }>
              <Text style={ localStyles.sectionTitleText }>我的工作项目</Text>
            </ImageBackground>
            <View style={ localStyles.sectionList }>
              <ManagementProjects groups={ workerProjectsGroups } projects={ onlyOneWorkerGroupProjects } />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    this.props.navigation.addListener('willBlur', () => {
      this.areaSelector.setState({ show: false });
    });
  }

  componentWillMount() {
    this.props.actions.getWorkerProjectsGroupsAsync();
    if (this.props.memberCheckable) this.props.actions.getAllProjectsGroupsAsync();
  }
};

const { height } = Dimensions.get('window');
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
  container: {
    marginLeft: 10,
    marginRight: 10,
    height: height - 230
  },

  section: {
    marginBottom: 36
  },
  sectionTitle: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    backgroundColor: styles.colors.cActive,
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden'
  },
  sectionTitleText: {
    color: styles.colors.cWhite,
    fontSize: 16
  },
  sectionList: {
    backgroundColor: styles.colors.cBg
  },

  members: {},
  projects: {}
});
