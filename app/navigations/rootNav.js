import React from 'react';
import { StackNavigator } from 'react-navigation';

import UnauthorizedNav from './UnauthorizedNav'
import TabNavScreen from './TabNav'

const RootStack = StackNavigator(
    {
        Authorized: {
            screen: TabNavScreen,
        },
        Unauthorized: {
            screen: UnauthorizedNav,
        },
    },
    {
        initialRouteName: 'Authorized',
        headerMode: 'none',
        cardStyle: {
          shadowColor: 'transparent',
        },
        navigationOptions: {
          gesturesEnabled: false,
        },
    }
);

export default class RootNav extends React.Component {
    render() {
        return <RootStack />;
    }
}