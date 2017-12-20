import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class AddGroupButton extends Component {
    render(){
        return(
            <View style={styles.main}>
                <Text style={styles.label}>Create New Group</Text>
                <TouchableOpacity 
                    onPress={this.props.addMessage}
                    style={styles.circle}>
                    <Icon name='group' size={45} color='white' />
                </TouchableOpacity>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    main: {
        position:'absolute',
        bottom:150,
        right:20,
        flexDirection:'row'
    },
    circle: {
        width:70,
        height:70,
        borderRadius:35,
        backgroundColor:'rgb(28,135,206)',
        alignItems:'center',
        justifyContent:'center'
    },
    label : {
        alignSelf:'center',
        paddingRight:10,
        fontSize:14,
        fontWeight:'bold'
    }
});