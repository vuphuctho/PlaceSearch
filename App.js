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
import MapView from './src/screens/MapView'

const App =  StackNavigator({
  Home: {
    screen: Home
  },
  MapView: {
    screen: MapView
  }
});

export default App