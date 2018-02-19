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
        cardStyle: {
          shadowColor: 'transparent',
        },
        navigationOptions: {
          gesturesEnabled: false,
        },
    }
);

export default class ChatNav extends React.Component {
    render() {
        return <RootStack />;
    }
}