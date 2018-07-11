import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';
import NavigatorService from '@/services/navigator';
import { PROJECTS_PAGE_FROM_PROJECTS } from '@/utils/constants';
import Icon from '@/static/iconfont/iconfont';
import IconsGroup from '@/utils/projectIcons';
import styles from '@/styles';
import listStyle from '@/styles/partial/management-section-list';

export default class OneGroupWorker extends Component {
  static propTypes = {
    projects: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    projects: []
  }

  constructor(props) {
    super(props);

    this.gotoProjects = this.gotoProjects.bind(this);
    this.gotoProject = this.gotoProject.bind(this);
  }

  gotoProjects({ groupId, onlyOneGroup }) {
    NavigatorService.navigate('Projects', {
      type: PROJECTS_PAGE_FROM_PROJECTS,
      groupId,
      onlyOneGroup
    });
  }

  gotoProject(projectId) {
    NavigatorService.navigate('Project', { projectId });
  }

  itemStyle(index) {
    const len = this.props.projects.length;
    if (len <= 4) {
      return listStyle.itemNoBottom;
    } else {
      if (index < 3) {
        return listStyle.item;
      }
      if (index == 3) {
        return listStyle.itemNoRight;
      }
      if (index > 3 && index <= 7) {
        return listStyle.itemNoBottom;
      }
    }
  }

  render() {
    const { projects } = this.props;

    if (projects.length) {
      const groupId = projects[0].projectGroupId;

      return (
        <View style={ listStyle.group }>
          {projects.slice(0, 7).map((p, idx) =>
          <TouchableHighlight
            key={ p.id }
            onPress={ () => this.gotoProject(p.id) }
            underlayColor={ styles.colors.cLiteGray }
            style={ this.itemStyle(idx) }>
            <View style={ listStyle.cont }>
              <Icon name={IconsGroup(p.name)} size={28} color={styles.colors.cActive} />
              <Text style={ listStyle.itemTitle }>{ p.name }</Text>
            </View>
          </TouchableHighlight>)}

          {projects.length >= 8 && <TouchableHighlight
            onPress={ () => this.gotoProjects({ groupId, onlyOneGroup: true}) }
            underlayColor={ styles.colors.cLiteGray }
            style={ listStyle.itemLast }>
            <View style={ listStyle.cont }>
              <Icon name='liuchengdan-quanbu' size={28} color={styles.colors.cActive} />
              <Text>全部</Text>
            </View>
          </TouchableHighlight>}
        </View>
      );
    } else {
      return <View style={ listStyle.group }></View>;
    }
  }
};
