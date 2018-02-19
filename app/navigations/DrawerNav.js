import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import HomeScreen from '../containers/authorized/HomeScreen'
import DashboardScreen from '../containers/authorized/DashboardScreen'
import SettingScreen from '../containers/authorized/SettingScreen'

const RootStack = DrawerNavigator(
    {   
        Home: {
            screen: HomeScreen,
        },
        Dashboard: {
            screen: DashboardScreen,
        },
        Setting: {
            screen: SettingScreen,
        },
    },
    {
        initialRouteName: 'Home',
        cardStyle: {
          shadowColor: 'transparent',
        },
        navigationOptions: {
          gesturesEnabled: false,
        },
    }
);

export default class DrawerNav extends React.Component {
    render() {
        return <RootStack />;
    }
}