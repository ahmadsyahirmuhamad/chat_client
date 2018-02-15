import React from 'react';
import { TabNavigator } from 'react-navigation';

import DrawerNavScreen from './DrawerNav'
import DashboardScreen from '../containers/authorized/DashboardScreen'
import SettingScreen from '../containers/authorized/SettingScreen'
import ChatNav from './ChatNav'

const RootStack = TabNavigator(
    {   
        DrawerNav: {
            screen: DrawerNavScreen,
        },
        Dashboard: {
            screen: DashboardScreen,
        },
        Setting: {
            screen: SettingScreen,
        },
        Chat: {
            screen: ChatNav,
        },
    },
    {
        initialRouteName: 'Dashboard',
        cardStyle: {
          shadowColor: 'transparent',
        },
        navigationOptions: {
          gesturesEnabled: false,
        },
    }
);

export default class TabNav extends React.Component {
    render() {
        return <RootStack />;
    }
}