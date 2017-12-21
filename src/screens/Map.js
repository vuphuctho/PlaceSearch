import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Alert } from 'react-native'

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

const getRouteCoords = (routes, coords = []) => {
  const steps = get(routes, '0.legs.0.steps', [])
  const len = steps.length
  coords = steps.map(step => ({
    latitude: step.start_location.lat,
    longitude: step.start_location.lng
  }))
  coords.push({
    latitude: steps[len - 1].end_location.lat,
    longitude: steps[len - 1].end_location.lng
  })
  return coords
}

class Map extends Component {
  static navigationOptions = {
    title: 'Map'
  }
  constructor(props) {
    super(props)
    this.state = { polylineCoords: [] }
    this.openSearch = this.openSearch.bind(this)
    this._fetchDirection = this._fetchDirection.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    const { originId, destId } = nextProps
    if (!isEmpty(originId) && !isEmpty(destId)) {
      this._fetchDirection(originId, destId)
    }
  }
  _fetchDirection(originId, destId) {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${originId}&destination=place_id:${destId}&mode=walking&key=AIzaSyA7Os3aZz2jfUB0G7PzJJRsTjm6FVYux6s`;
    fetch(url, { method: 'GET' })
      .then(resp => {
        if (resp.ok) {
          const { status, routes } = JSON.parse(get(resp, '_bodyText'))
          if (status === 'OK') {
            const coords = getRouteCoords(routes)
            this.setState({ polylineCoords: coords })
          }
        }
      }).catch(e => { console.log(e)})
  }
  openSearch(target) {
    const { setCurrentSearch } = this.props
    const { navigate } = this.props.navigation
    setCurrentSearch(target)
    navigate('Search')
  }
  render() {
    const { polylineCoords } = this.state
    const {
      originName = '',
      destName = '',
      originCoord = {},
      destCoord = {}
    } = this.props
    originText = isEmpty(originName) ? 'Enter start point' : originName
    destinationText = isEmpty(destName) ? 'Enter destination' : destName
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
          {!isEmpty(originCoord) &&
            <MapView.Marker coordinate={originCoord} />
          }
          {!isEmpty(destCoord) &&
            <MapView.Marker coordinate={destCoord} pinColor='#3498db'/>
          }
          {!isEmpty(polylineCoords) &&
            <MapView.Polyline
              coordinates={polylineCoords}
              strokeColor='#3498db'
              strokeWidth={2} />
          }
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
  originName: get(state, 'direction.origin.name', ''),
  destName: get(state, 'direction.destination.name', ''),
  originCoord: isEmpty(state, 'direction.origin') ? {} : {
    latitude: get(state, 'direction.origin.geometry.location.lat', 0),
    longitude: get(state, 'direction.origin.geometry.location.lng', 0)
  },
  destCoord: isEmpty(state, 'direction.destination') ? {} : {
    latitude: get(state, 'direction.destination.geometry.location.lat', 0),
    longitude: get(state, 'direction.destination.geometry.location.lng', 0)
  },
  originId: get(state, 'direction.origin.place_id', ''),
  destId: get(state, 'direction.destination.place_id', '')
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