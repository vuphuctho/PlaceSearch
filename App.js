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

import Home from './src/screens/Home'
import Map from './src/screens/Map'

const App =  StackNavigator({
  Home: {
    screen: Home
  },
  MapView: {
    screen: Map
  }
});

export default App