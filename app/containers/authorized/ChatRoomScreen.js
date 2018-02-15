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
} from 'react-native';
import SubmitButton from '../../components/Button/SubmitButton'
import { Socket } from '../../../lib/phoenix'

export default class ChatRoomScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { id, title } = navigation.state.params;
    
    return {
      title: title ? title : 'Main',
    }
  };

  constructor(props) {
    super(props)

    this.state = {
      id: null,
      title: null,
      message: '',
      messages: [
        {
          user: "Anon",
          body: "this is a message"
        },
        {
          user: "John",
          body: "Hello World"
        },
      ],
    }
    this.channel = this.connectToSocket()
    
    this.onSubmitMessage = this.onSubmitMessage.bind(this)
    this.connectToSocket = this.connectToSocket.bind(this)
    this.subscribeToChannel = this.subscribeToChannel.bind(this)
  }

  componentWillMount() {
    const { id, title } = this.props.navigation.state.params;
    this.setState({
      id, title
    })
    this.subscribeToChannel()
  }

  subscribeToChannel() {
    this.channel.join()
      .receive("ignore", () => console.log("auth error"))
      .receive("ok", () => console.log("join ok"))

    this.channel.onError(e => console.log("something went wrong", e))
    this.channel.onClose(e => console.log("channel closed", e))

    // incoming message event
    this.channel.on("new:msg", msg => {
      console.log(msg)
      this.setState({ messages: this.state.messages.concat([msg]) })
    })
  }

  onSubmitMessage() {
    this.channel.push("new:msg", {user: 'Anon', body: this.state.message})
    this.setState({message: ''})
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
