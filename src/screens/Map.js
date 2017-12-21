import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'

import { get, isEmpty } from 'lodash'
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import { setCurrentSearch } from '../actions/direction'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 1.3039991;
const LONGITUDE = 103.8319 // 103.8316911;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class Map extends Component {
  static navigationOptions = {
    title: 'Map'
  }
  constructor(props) {
    super(props)
    this.openSearch = this.openSearch.bind(this)
  }
  openSearch(target) {
    const { setCurrentSearch } = this.props
    const { navigate } = this.props.navigation
    setCurrentSearch(target)
    navigate('Search')
  }
  render() {
    const { origin, destination } = this.props
    originText = isEmpty(origin) ? 'Enter start point' : 'Nah'
    destinationText = isEmpty(destination) ? 'Enter destination' : 'Nah'
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
            onPress={() => this.openSearch('origin')}>
            <Text style={styles.inputText}>{originText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.inputBottom}
            onPress={() => this.openSearch('destination')}>
            <Text style={styles.inputText}>{destinationText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapState = state => ({
  origin: get(state, 'direction.origin', {}),
  destination: get(state, 'direction.destination', {})
})

const mapDispatch = dispatch => ({
  setCurrentSearch: (target) => { dispatch(setCurrentSearch(target))
  }
})

export default connect(mapState, mapDispatch)(Map)

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