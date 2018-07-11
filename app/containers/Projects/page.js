import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native';
import SortableGrid from 'react-native-sortable-grid';
import {
  PROJECTS_PAGE_FROM_PROJECTS,
  PROJECTS_PAGE_FROM_MEMBERS
} from '@/utils/constants';
import styles from '@/styles';
import ProjectsMaskHint from '@/static/images/projects-mask-hint.png';
import Icon from '@/static/iconfont/iconfont';
import IconsGroup from '@/utils/projectIcons';

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFirstLogin: true,
      type: PROJECTS_PAGE_FROM_MEMBERS,
      sorting: null
    };

    this.handleHideMask = this.handleHideMask.bind(this);
    this.gotoSubpage = this.gotoSubpage.bind(this);
    this.sorting = this.sorting.bind(this);
  }

  handleHideMask() {
    this.setState({
      isFirstLogin: false
    });
  }

  gotoSubpage({ projectId, projectName }) {
    if (this.state.type === PROJECTS_PAGE_FROM_PROJECTS) {
      this.props.navigation.navigate('Project', { projectId, projectName });
    } else if (this.state.type === PROJECTS_PAGE_FROM_MEMBERS) {
      this.props.navigation.navigate('Members', { projectId, projectName });
    }
  }

  sorting(orderData) {
    const groupId = this.props.navigation.getParam('groupId');
    const type = this.props.navigation.getParam('type');

    storage.setSortingData(type, groupId, orderData);
  }

  render() {
    const ps = this.props.selectedGroupProjects;
    if (ps.length) {
      return (
        <View style={[ styles.layouts.page, localStyles.page ]}>
          <ScrollView style={ localStyles.cont }>
            <SortableGrid
              itemsPerRow={ 4 }
              onDragRelease={ this.sorting }>
              {
                ps.map(p =>
                  <View key={ p.id } style={ localStyles.item } onTap={ () => this.gotoSubpage({ projectId: p.id, projectName: p.name }) }>
                    <View style={ localStyles.itemCont }>
                      <Icon name={IconsGroup(p.name)} size={28} color={styles.colors.cActive} />
                      <Text style={ localStyles.itemTitle }>{ p.name }</Text>
                    </View>
                  </View>
                )
              }
            </SortableGrid>
          </ScrollView>

          {this.state.isFirstLogin && <View style={ localStyles.mask }>
            <Image source={ ProjectsMaskHint } resizeMode={ 'contain' } style={ localStyles.maskImage } />
            <Text style={ localStyles.maskText }>长按拖动可自行改变位置哦！</Text>
            <TouchableHighlight style={ localStyles.maskBtn } onPress={ this.handleHideMask }>
              <Text style={ localStyles.maskText }>知道了</Text>
            </TouchableHighlight>
          </View>}
        </View>
      );
    }

    return <View></View>;
  }

  async componentWillMount() {
    // select group and get related projects
    const groupId = this.props.navigation.getParam('groupId');
    this.props.actions.selectGroup(groupId);

    // from type ? 'members' || 'projects'
    const type = this.props.navigation.getParam('type');
    this.setState({ type });

    const onlyOneGroup = this.props.navigation.getParam('onlyOneGroup');
    if (onlyOneGroup) {
      this.props.actions.copySelectedProjectsFromOnlyOneGroup();
    } else {
      this.props.actions.getProjectsByGroupAsync({ groupId, type });
    }

    // first login ?
    try {
      await storage.isFirstLogin();
      this.setState({ isFirstLogin: false });
    } catch (e) {
      switch (e.name) {
        case 'NotFoundError':
          this.setState({ isFirstLogin: true });
          storage.notFirstLoginAnymore();
          break;
        case 'ExpiredError':
          storage.notFirstLoginAnymore();
          break;
        default:
          break;
      }
    }
  }

  componentWillUnmount() {
    this.props.actions.resetSelected();
  }
}

const { width } = Dimensions.get('window');
const localStyles = StyleSheet.create({
  page: {
    position: 'relative',
    alignItems: 'center',
    paddingTop: 10
  },
  cont: {
    width: width - 18,
    backgroundColor: styles.colors.cWhite,
    borderRadius: 4
  },

  item: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styles.colors.cWhite,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,.05)',
    padding: 10
  },
  itemCont: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 8,
    overflow: 'hidden'
  },
  itemTitle: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    height: 36,
    overflow: 'hidden',
    textAlign: 'center'
  },

  mask: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskImage: {
    position: 'absolute',
    zIndex: 2,
    right: '50.5%',
    top: 20,
    width: '45%',
    height: '34%'
  },
  maskText: {
    fontSize: 16,
    color: styles.colors.cWhite
  },
  maskBtn: {
    width: 90,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: styles.colors.cWhite,
    borderWidth: 1,
    marginTop: 20
  }
});
