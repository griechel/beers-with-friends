import React, { Component } from 'react';
import { View, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import ChatList from '../containers/ChatList';
import ChatItem from '../containers/ChatItem';


export default class Chat extends Component {

    render() {
        return (
            <View style={styles.main}>
                <ChatList navigation={this.props.navigation}/>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    main: {
        width:100+'%',
        height:100+'%',
    }
});