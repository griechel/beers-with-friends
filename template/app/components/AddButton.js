import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class AddButton extends Component {
    render(){
        return(
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('CreateEvent')}
                style={styles.circle}>
                <Icon name='add' size={60} color='white' />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    circle: {
        width:70,
        height:70,
        borderRadius:35,
        backgroundColor:'rgba(28,135,206,.9)',
        position:'absolute',
        bottom:20,
        right:20,
        alignItems:'center',
        justifyContent:'center'
    }
});