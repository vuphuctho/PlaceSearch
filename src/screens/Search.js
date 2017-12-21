import React, { Component } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export default class Search extends Component {
  static navigationOptions = {
    title: 'Search for Location'
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          placeholder="Enter a location to search" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    width: '100%',
    paddingLeft: 15
  }
})