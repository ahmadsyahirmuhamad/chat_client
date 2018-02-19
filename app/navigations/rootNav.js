import React from 'react';
import { StackNavigator } from 'react-navigation';

import UnauthorizedNav from './UnauthorizedNav'
import TabNavScreen from './TabNav'

import localStorage from '../lib/LocalStorage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { updateToken, fetchUser } from '../actions/user_action';

class RootNav extends React.Component {
    constructor(props) {
        super(props)

        this.verifyUserToken = this.verifyUserToken.bind(this)
        this.renderRoute = this.renderRoute.bind(this)
    }

    componentWillMount() {
        this.verifyUserToken()
    }

    async verifyUserToken() {
        const token = await localStorage.getItem("token")
        if (token && token.length > 0) {
            this.props.updateToken(token)
            this.props.fetchUser()
        }
    }

    renderRoute() {
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
                initialRouteName: this.props.user.authToken ? 'Authorized' : 'Unauthorized',
                headerMode: 'none',
                cardStyle: {
                  shadowColor: 'transparent',
                },
                navigationOptions: {
                  gesturesEnabled: false,
                },
            }
        );
        return <RootStack />
    }


    
    render() {
        return this.renderRoute()
    }
}

const mapDispatchToProps = dispatch => {
    return {
      updateToken: bindActionCreators(updateToken, dispatch),
      fetchUser: bindActionCreators(fetchUser, dispatch)
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(RootNav)
