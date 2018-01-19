import React, { Component } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';

export default class PublicSwitch extends Component {
    constructor(){
        super();
        this.state = {
            toggled: true,
            switchLabel:'Yes'
        }
    }
    
    handleSwitch() {
        this.setState({toggled: !this.state.toggled});
        if (this.state.switchLabel=='Yes') {
            this.setState({switchLabel:'No'})
        } else {
            this.setState({switchLabel:'Yes'})
        };
    }

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.label}>
                    <Text>Public Event</Text>
                </View>
                <View style={styles.switch}>
                    <Text style={styles.text}>{this.state.switchLabel}</Text>
                    <Switch 
                    onValueChange={this.handleSwitch.bind(this)}
                    value={this.state.toggled}
                    tintColor='grey'
                    onTintColor='orange'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        width:100+'%',
        height:60,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:5
    },
    label: {
        marginLeft: 10
    },
    switch: {
        flexDirection:'row',
        alignItems:'center',
        marginRight: 10
    },
    text: {
        paddingRight:10
    }
});