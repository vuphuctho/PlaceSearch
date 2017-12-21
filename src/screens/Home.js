import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'


export default class Home extends Component {
  static navigationOptions = {
    header: null
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image
            style={styles.logo}
            source={require('../images/placeholder.png')} />
          <Text style={styles.title}>Place Search</Text>
          <Text style={styles.subtitle}>Find place and get direction inside ION Orchard</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { navigate('MapView'); }}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db'
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    paddingTop: 10,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff'
  },
  subtitle: {
    color: '#fff'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
}