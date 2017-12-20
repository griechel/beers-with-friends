import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import AddFromContacts from '../components/AddFromContacts';
import AddGroupButton from '../components/AddGroupButton';

export default class AddFriend extends Component {
    render() {
        return (
            <View style={styles.main}>
                <AddFromContacts style={styles.fromContacts}/>
                <AddGroupButton />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        width:100+'%',
        height:100+'%',
        backgroundColor:'white'
    },
    fromContacts: {
        bottom:20,
        right:20,
        position:'absolute'
    }
});