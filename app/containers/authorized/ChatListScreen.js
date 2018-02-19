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
import { connect } from 'react-redux';

import { Socket } from '../../lib/phoenix'

class ChatListScreen extends Component {
  static navigationOptions = {
    title: 'Main',
  };

  constructor(props) {
    super(props)

    this.state = {
      messages: [
        {
          id: 'one',
          user: 'Anon',
          body: 'lorem ipsum'
        },
        {
          id: 'two',
          user: 'Anon',
          body: 'lorem ipsum'
        },
      ],
      rooms: [
        {
          id: 'one',
          title: 'One'
        },
        {
          id: 'two',
          title: 'Two'
        }
      ]
    }

    this.channel = this.connectToSocket()
    
    this.connectToSocket = this.connectToSocket.bind(this)
    this.subscribeToChannel = this.subscribeToChannel.bind(this)
    this.onAppendMessage = this.onAppendMessage.bind(this)
  }

  componentWillMount() {
    this.subscribeToChannel()
  }

  componentWillUnmount() {
    this.channel = null
  }

  connectToSocket() {
    // create instance socket
    let socket = new Socket("ws://localhost:4000/socket")
    // connect to socket
    socket.connect()
    const channel = socket.channel("floating:msg")
    return channel
  }

  subscribeToChannel() {
    this.channel.join()
      .receive("ignore", () => console.log("auth error"))
      .receive("ok", () => console.log("join ok"))

    this.channel.onError(e => console.log("something went wrong", e))
    this.channel.onClose(e => console.log("channel closed", e))

    // incoming message event
    this.channel.on("new:msg", msg => {
      this.onAppendMessage(msg)
    })
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

  onAppendMessage(msg) {
    this.setState({ messages: this.state.messages.concat([msg]) })
  }

  _onPress = (item) => {
    let messages = this.state.messages.filter((row) => row.id === item.id)
    
    this.props.navigation.navigate('ChatRoom', {
      id: item.id,
      username: this.props.user.firstName,
      title: item.title,
      messages:  messages,
      floatingChannel: this.channel,
      onAppendMessage: this.onAppendMessage
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

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(ChatListScreen)
