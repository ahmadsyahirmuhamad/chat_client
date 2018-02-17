import React from 'react';
import { StackNavigator } from 'react-navigation';

import ChatListScreen from '../containers/authorized/ChatListScreen'
import ChatRoomScreen from '../containers/authorized/ChatRoomScreen'

const RootStack = StackNavigator(
    {
        ChatList: {
            screen: ChatListScreen,
        },
        ChatRoom: {
            screen: ChatRoomScreen,
        },
    },
    {
        initialRouteName: 'ChatList',
        // headerMode: 'none',
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