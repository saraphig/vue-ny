import { StyleSheet } from 'react-native';

const defaultItemStyle = {
  width: '25%',
  height: 100,
  justifyContent: 'center',
  alignItems: 'center',
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderColor: 'rgba(0,0,0,.05)'
};

const listStyle = StyleSheet.create({
  group: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  item: {
    ...defaultItemStyle
  },
  itemNoRight: {
    ...defaultItemStyle,
    borderRightWidth: 0
  },
  itemNoBottom: {
    ...defaultItemStyle,
    borderBottomWidth: 0
  },
  itemLast: {
    ...defaultItemStyle,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  cont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemIcon: {
    width: 40,
    height: 40,
    marginBottom: 4
  },
  itemTitle: {
    fontSize: 12
  }
});

export default listStyle;
