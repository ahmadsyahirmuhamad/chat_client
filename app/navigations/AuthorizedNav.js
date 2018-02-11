// import React from 'react';
// import { StackNavigator } from 'react-navigation';

// import DashboardScreen from '../containers/authorized/DashboardScreen'

// const RootStack = StackNavigator(
//     {
//         Dashboard: {
//             screen: DashboardScreen,
//         },
//     },
//     {
//         initialRouteName: 'Dashboard',
//         cardStyle: {
//           shadowColor: 'transparent',
//         },
//         navigationOptions: {
//           gesturesEnabled: false,
//         },
//     }
// );

// export default class AuthorizedNav extends React.Component {
//     render() {
//         return <RootStack />;
//     }
// }

import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import DashboardScreen from '../containers/authorized/DashboardScreen'
import SettingScreen from '../containers/authorized/SettingScreen'

const RootStack = DrawerNavigator(
    {
        Dashboard: {
            screen: DashboardScreen,
        },
        Setting: {
            screen: SettingScreen,
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

export default class AuthorizedNav extends React.Component {
    render() {
        return <RootStack />;
    }
}