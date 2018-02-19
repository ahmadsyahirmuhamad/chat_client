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
  Dimensions,
  TextInput,
  AppState,
} from 'react-native';
import SubmitButton from '../../components/Button/SubmitButton'
import { Socket } from '../../lib/phoenix'

export default class ChatRoomScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { id, title } = navigation.state.params;
    
    return {
      title: title ? title : 'Main',
    }
  };

  constructor(props) {
    super(props)
    const { id, floatingChannel } = this.props.navigation.state.params
    this.state = {
      id: id,
      title: null,
      message: '',
      messages: [],

      appState: AppState.currentState
    }
    this.channel = this.connectToSocket()
    this.floatingChannel = floatingChannel
    
    this.onSubmitMessage = this.onSubmitMessage.bind(this)
    this.connectToSocket = this.connectToSocket.bind(this)
    this.subscribeToChannel = this.subscribeToChannel.bind(this)
  }

  componentWillMount() {
    const { id, title, messages } = this.props.navigation.state.params;
    this.setState({ id, title, messages: messages })
    this.subscribeToChannel()
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    this.channel = null
    this.floatingChannel = null
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }

  connectToSocket() {
    const { id } = this.props.navigation.state.params;
    // create instance socket
    let socket = new Socket("ws://localhost:4000/socket")
    // connect to socket
    socket.connect()
    const channel = socket.channel(`rooms:${id}`)
    return channel
  }

  subscribeToChannel() {
    const { onAppendMessage } = this.props.navigation.state.params

    this.channel.join()
      .receive("ignore", () => console.log("auth error"))
      .receive("ok", () => console.log("join ok"))

    this.channel.onError(e => console.log("something went wrong", e))
    this.channel.onClose(e => console.log("channel closed", e))

    this.floatingChannel.on("new:msg", msg => {
      if (msg.id === this.state.id) {
        if (this.state.appState === "active") {
          onAppendMessage(msg)
        }
        this.setState({ messages: this.state.messages.concat([msg]) })
      }
    })
  }

  onSubmitMessage() {
    this.channel.push("new:msg", {id: this.state.id, user: 'Anon', body: this.state.message})
    this.setState({message: ''})
  }
  
  

  _keyExtractor = (item, index) => `${item.user}-${item.body}`;

  _renderItem = ({item}) => (
    <Text>{item.user}: {item.body}</Text>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to {this.state.title}
        </Text>
        <View style={styles.chatBox}>
          <View style={styles.messageList}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <FlatList
                data={this.state.messages}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </ScrollView>
          </View>
          <View style={styles.chatAction}>
            <TextInput
              style={styles.chatInput}
              onChangeText={(message) => this.setState({message})}
              value={this.state.message}
            />
            <SubmitButton onSubmitMessage={this.onSubmitMessage}/>
          </View>          
        </View>
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
    paddingTop: 10,
  },
  chatBox: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingVertical: 20
  },
  messageList: {
    flex: 2,
    borderWidth: 1,
    width: width * 0.9,
    padding: 10
  },
  chatInput: {
    flex: 3,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  chatAction: {
    flex: 0,
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between'
  }
});
