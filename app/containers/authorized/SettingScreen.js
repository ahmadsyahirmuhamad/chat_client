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

export default class SettingScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Setting',
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          SettingScreen
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
