import React from 'react';
import { TabNavigator } from 'react-navigation';

import HomeNav from './HomeNav'
import ChatNav from './ChatNav'

const RootStack = TabNavigator(
    {   
        Home: {
            screen: HomeNav,
        },
        Chat: {
            screen: ChatNav,
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

export default class TabNav extends React.Component {
    render() {
        return <RootStack />;
    }
}