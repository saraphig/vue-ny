/**
 *
 * Copyright 2018-present rn_nongye
 *
 */
 
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import App from './containers';
import storage from '@/services/storage';

global.storage = storage;
const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
