/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux'

import store from './src/store'

import Home from './src/screens/Home'
import Map from './src/screens/Map'
import Search from './src/screens/Search'

const AppNavigator =  StackNavigator({
  Home: {
    screen: Home
  },
  MapView: {
    screen: Map
  },
  Search: {
    screen: Search
  }
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

export default App