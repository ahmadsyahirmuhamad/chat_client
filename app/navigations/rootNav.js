import React from 'react';
import { StackNavigator } from 'react-navigation';

import UnauthorizedNav from './UnauthorizedNav'
import TabNavScreen from './TabNav'

const RootStack = StackNavigator(
    {   
        Unauthorized: {
            screen: UnauthorizedNav,
        },
        Authorized: {
            screen: TabNavScreen,
        },
    },
    {
        initialRouteName: 'Unauthorized',
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