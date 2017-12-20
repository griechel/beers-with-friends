import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class AddFriendButton extends Component {
    render(){
        return(
            <TouchableOpacity 
                onPress={() => this.props.action()}
                style={styles.circle}>
                <Icon name='person-add' size={45} color='white' />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    circle: {
        width:70,
        height:70,
        borderRadius:35,
        backgroundColor:'rgb(28,135,206)',
        position:'absolute',
        bottom:20,
        right:20,
        alignItems:'center',
        justifyContent:'center'
    }
});