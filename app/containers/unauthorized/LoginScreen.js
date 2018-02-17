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
} from 'react-native';
import Button from '../../components/Button/Button'
import InputText from '../../components/Input/InputText'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { login } from '../../actions/user_action';

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onLogin = this.onLogin.bind(this)
    this.gotoRegister = this.gotoRegister.bind(this)
  }

  onChangeEmail(email) {
    this.setState({email})
  }

  onChangePassword(password) {
    this.setState({password})
  }

  onLogin() {
    this.props.login(this.state.email, this.state.password)
    .then((response) => {
      if (response) {
        alert("success")
      } else {
        alert(this.props.user.message)
      }
    })
  }

  gotoRegister() {
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          LoginScreen
        </Text>
        
        <InputText
          onChangeText={this.onChangeEmail}
          value={this.state.email}
          placeholder="Email"
        />

        <InputText
          onChangeText={this.onChangePassword}
          value={this.state.password}
          placeholder="Password"
          secureTextEntry={true}
        />

        <Button
          onSubmit={this.onLogin}
          title="Login"
        />
        
        <Button
          onSubmit={this.gotoRegister}
          title="Register"
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

const mapDispatchToProps = dispatch => {
  return {
    login: bindActionCreators(login, dispatch)
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
