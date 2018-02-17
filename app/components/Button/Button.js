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
  TouchableHighlight,
  Dimensions
} from 'react-native';

export default class Button extends Component {
  render() {
    return (
        <TouchableHighlight
            onPress={() => this.props.onSubmit()}
            style={styles.button}
            >
            <Text style={styles.buttonText}>{this.props.title}</Text>
        </TouchableHighlight>
    );
  }
}

Button.defaultProps = {
    title: 'Submit'
};

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.2,
    margin: 10,
    padding: 10,
    backgroundColor: '#8080FF',
    borderRadius: 15
  },
  buttonText: {
      color:'white',
  }
});
