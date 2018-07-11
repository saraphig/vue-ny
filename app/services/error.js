import NavigatorService from './navigator';
import { Alert } from 'react-native';

export default {
  handleAPIError(e) {
    if (e.response) {
      if (e.response.status === 401 || e.response.status === 403) {
        Alert.alert('错误', '用户身份过期，请重新登录', [{ text: 'OK', onPress: () => {
          storage.remove({ key: 'token' });
          storage.remove({ key: 'user' });
          NavigatorService.navigate('Auth');
        } }]);
      } else if (e.response.status === 500) {
        Alert.alert('错误', '服务器连接错误，请稍后再试', [{ text: 'OK', onPress: () => {} }]);
      }
    }
  }
} 
