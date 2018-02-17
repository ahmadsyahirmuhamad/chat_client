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
  TextInput,
  Dimensions
} from 'react-native';

export default class InputText extends Component {
  render() {
    return (
        <TextInput
            style={styles.inputText}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            placeholder={this.props.placeholder}
            secureTextEntry={this.props.secureTextEntry}
      />
    );
  }
}

InputText.defaultProps = {
    value: '',
    placeholder: 'Fill in the blank',
    secureTextEntry: false
};

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  inputText: {
    width: width * 0.6,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 13,
    margin: 10,
    padding: 10,
  },
});
