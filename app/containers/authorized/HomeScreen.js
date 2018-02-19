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
} from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Main',
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          HomeScreen
        </Text>
        <Button
          title="Open Drawer"
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
        />
      </View>
    );
  }
}

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
});
