import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'

import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 1.3039991;
const LONGITUDE = 103.8319 // 103.8316911;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class Map extends Component {
  static navigationOptions = {
    title: 'Map'
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <MapView
          provider="google"
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          showsIndoors={true}
          showsIndoorLevelPicker={false}
          ref={map => {this.map = map;}} >
        </MapView>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.inputTop}
            onPress={() => navigate('Search')}>
            <Text style={styles.inputText}>Enter start point</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputBottom}>
            <Text style={styles.inputText}>Enter destination</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    width: '100%',
    paddingTop: 40,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  inputTop: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderStyle: 'solid',
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1
  },
  inputBottom: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inputText: {
  }
});