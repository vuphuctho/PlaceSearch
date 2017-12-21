import React, { Component } from 'react'
import { ScrollView, View, TextInput, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

import { get, keys } from 'lodash'
import { connect } from 'react-redux'

import search_data from '../constants/locations'
import { selectLocation } from '../actions/search'

class Search extends Component {
  static navigationOptions = {
    title: 'Search for Location'
  }
  constructor(props) {
    super(props)
    this.onLocationSelected = this.onLocationSelected.bind(this)
  }
  onLocationSelected(item) {
    const { selectLocation } = this.props
    const { goBack } = this.props.navigation
    selectLocation(item)
    goBack()
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
          renderItem={({item}) => renderListItem(item, this.onLocationSelected)}
          />
      </ScrollView>
    )
  }
}

const renderListItem = (item, selectLocation) => {
  const { id, name, formatted_address } = item
  return (
    <TouchableOpacity
      key={id}
      style={styles.item}
      onPress={() => selectLocation(item)}>
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

const mapDispatch = dispatch => ({
  selectLocation: location => { dispatch(selectLocation(location)) }
})

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