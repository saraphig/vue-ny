import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import {
  STORAGE_IS_FIRST_LOGIN,
  STORAGE_SORTING_MEMBERS_PREFIX,
  STORAGE_SORTING_PROJECTS_PREFIX,
  PROJECTS_PAGE_FROM_PROJECTS,
  PROJECTS_PAGE_FROM_MEMBERS
} from '@/utils/constants';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 7 * 24 * 3600 * 1000, // one week
  enableCache: true,
  sync() {}
});

storage.isFirstLogin = () => {
  return storage.load({ key: STORAGE_IS_FIRST_LOGIN });
};

storage.notFirstLoginAnymore = () => {
  storage.save({ key: STORAGE_IS_FIRST_LOGIN, data: 'not first login anymore' });
};

storage.getSortingData = (type, projectId) => {
  let key;
  if (type === PROJECTS_PAGE_FROM_PROJECTS) {
    key = STORAGE_SORTING_PROJECTS_PREFIX + projectId;
  } else if (type === PROJECTS_PAGE_FROM_MEMBERS) {
    key = STORAGE_SORTING_MEMBERS_PREFIX + projectId;
  }
  return storage.load({ key });
};

storage.setSortingData = (type, projectId, sortingData) => {
  let key;
  if (type === PROJECTS_PAGE_FROM_PROJECTS) {
    key = STORAGE_SORTING_PROJECTS_PREFIX + projectId;
  } else if (type === PROJECTS_PAGE_FROM_MEMBERS) {
    key = STORAGE_SORTING_MEMBERS_PREFIX + projectId;
  }
  storage.save({ key, data: sortingData });
}

export default storage;
