import { API_BASE_URL } from 'react-native-dotenv';
import axios from 'axios';

const a = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

export default a;
