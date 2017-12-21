import React, { Component } from 'react'
import { ScrollView, View, TextInput, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

import { get, keys } from 'lodash'
import { connect } from 'react-redux'

import search_data from '../constants/locations'

class Search extends Component {
  static navigationOptions = {
    title: 'Search for Location'
  }
  render() {
    const { target } = this.props
    const placeholder = `Search for ${target}`
    return (
      <ScrollView>
        <TextInput style={styles.input}
          underlinecolorAndroid="transparent"
          placeholder={placeholder} />
        <FlatList style={styles.list}
          data={search_data}
          keyExtractor={(item) => item.id}
          renderItem={renderListItem}
          />
      </ScrollView>
    )
  }
}

const renderListItem = ({ item }) => {
  const { id, name, formatted_address } = item
  return (
    <TouchableOpacity
      key={id}
      style={styles.item}
      onPress={() => {}}>
      <View>
        <Text style={styles.itemTitle}>{name}</Text>
        <Text style={styles.itemSubtitle}>{formatted_address}</Text>
      </View>
    </TouchableOpacity>
  )
}

const mapState = state => ({
  target: state.direction.currentSearch
})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(Search)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  list: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid'
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    width: '100%',
    paddingLeft: 15
  },
  item: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid'
  },
  itemTitle: {
    padding: 10,
    fontSize: 20
  },
  itemSubtitle: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: '#aaa'
  }
})