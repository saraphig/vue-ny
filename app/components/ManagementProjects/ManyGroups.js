import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';
import NavigatorService from '@/services/navigator';
import IconsGroup from '@/utils/specialIcons';
import { PROJECTS_PAGE_FROM_PROJECTS } from '@/utils/constants';
import styles from '@/styles';
import listStyle from '@/styles/partial/management-section-list';

export default class ManyGroupsWorker extends Component {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    groups: []
  }

  constructor(props) {
    super(props);

    this.gotoProjects = this.gotoProjects.bind(this);
  }

  gotoProjects(groupId) {
    NavigatorService.navigate('Projects', {
      type: PROJECTS_PAGE_FROM_PROJECTS,
      groupId
    });
  }

  itemStyle(index) {
    const len = this.props.groups.length;
    const rows = Math.floor(len / 4) + (len % 4 > 0 ? 1 : 0);
    const number = index + 1;

    if (len == number) return listStyle.itemLast; 
    if (len <= 4) {
      return listStyle.itemNoBottom;
    } else {
      if (Math.ceil(number / 4) < rows) {
        if (number % 4 == 0) {
          return listStyle.itemNoRight;
        } else {
          return listStyle.item;
        }
      } else {
        return listStyle.itemNoBottom;
      }
    }
  }

  render() {
    const { groups } = this.props;

    if (groups.length) {
      return (
        <View style={ listStyle.group }>
          {groups.map((p, idx) =>
            <TouchableHighlight
              key={ `project-${p.id}-${idx}` }
              onPress={ () => this.gotoProjects(p.id) }
              underlayColor={ styles.colors.cLiteGray }
              style={ this.itemStyle(idx) }>
              <View style={ listStyle.cont }>
                <Image source={ IconsGroup(p.name) } style={ listStyle.itemIcon } />
                <Text style={ listStyle.itemTitle }>{ p.name }</Text>
              </View>
            </TouchableHighlight>
          )}
        </View>
      );
    } else {
      return <View style={ listStyle.group }></View>;
    }
  }
};
