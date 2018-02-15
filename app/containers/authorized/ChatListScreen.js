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
  View,
  Button,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

export default class ChatListScreen extends Component {
  static navigationOptions = {
    title: 'Main',
  };

  constructor(props) {
    super(props)

    this.state = {
      rooms: [
        {
          id: 'lobby',
          title: 'Lobby'
        }
      ]
    }
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    <View style={styles.childRow}>
      <TouchableHighlight
        onPress={() => this._onPress(item)}>
        <View style={{backgroundColor: 'white', padding: 10}}>
          <Text>{item.title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );

  _onPress = (item) => {
    this.props.navigation.navigate('ChatRoom', {
      id: item.id,
      title: item.title
    })
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          ChatListScreen
        </Text>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <FlatList
            data={this.state.rooms}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </ScrollView>
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  contentContainer: {
    paddingTop: 20,
    paddingVertical: 20
  },
  childRow: {
    margin: 10,
    backgroundColor: '#D3D3D3',
    borderWidth: 1,
    width: width * 0.9
  }
});
