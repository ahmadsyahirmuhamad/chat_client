import React from 'react';
import { StackNavigator } from 'react-navigation';

import DrawerNav from './DrawerNav'


const RootStack = StackNavigator(
    {
        Drawer: {
          screen: DrawerNav,
        },
    },
    {
        initialRouteName: 'Drawer',
        cardStyle: {
          shadowColor: 'transparent',
        },
        navigationOptions: {
          gesturesEnabled: false,
        },
    }
);

export default class HomeNav extends React.Component {
    render() {
        return <RootStack />;
    }
}