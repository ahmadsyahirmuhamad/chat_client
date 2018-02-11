import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from '../containers/unauthorized/LoginScreen'
import RegisterScreen from '../containers/unauthorized/RegisterScreen'

const RootStack = StackNavigator(
    {
        Login: {
            screen: LoginScreen,
        },
        Register: {
            screen: RegisterScreen,
        },
    },
    {
        initialRouteName: 'Login',
        cardStyle: {
          shadowColor: 'transparent',
        },
        navigationOptions: {
          gesturesEnabled: false,
        },
    }
);

export default class UnauthorizedNav extends React.Component {
    render() {
        return <RootStack />;
    }
}