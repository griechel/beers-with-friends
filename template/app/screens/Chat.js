import React, { Component } from 'react';
import { View, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/eventActions';
import { connect } from 'react-redux';

import ChatList from '../containers/ChatList';
import ChatItem from '../containers/ChatItem';


class Chat extends Component {

    render() {
        return (
            <View style={styles.main}>
                <ChatList navigation={this.props.navigation} user={this.props.user} {...this.props.actions}/>
            </View>
        );
    }
    
}

export default connect(store => ({
    user: store.user
  }),
  (dispatch) => ({
    actions: bindActionCreators(eventActions, dispatch)
  })
  )(Chat);

const styles = StyleSheet.create({
    main: {
        width:100+'%',
        height:100+'%',
    }
});