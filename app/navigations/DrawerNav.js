import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import MainScreen from '../containers/authorized/MainScreen'
import DashboardScreen from '../containers/authorized/DashboardScreen'
import SettingScreen from '../containers/authorized/SettingScreen'

const RootStack = DrawerNavigator(
    {   Main: {
            screen: MainScreen,
        },
        Dashboard: {
            screen: DashboardScreen,
        },
        Setting: {
            screen: SettingScreen,
        },
    },
    {
        initialRouteName: 'Main',
        cardStyle: {
          shadowColor: 'transparent',
        },
        navigationOptions: {
          gesturesEnabled: false,
        },
    }
);

export default class AuthorizedNav extends React.Component {
    render() {
        return <RootStack />;
    }
}