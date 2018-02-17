/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import RootNav from './navigations/rootNav'

import { Provider } from 'react-redux';
import store from './store';


class App extends Component {
  
  render() {
    return (
        <Provider store={store}>
            <RootNav />
        </ Provider>
    )
  }
}

export default App