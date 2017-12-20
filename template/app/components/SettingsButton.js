import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class SettingsButton extends Component {
    render() {
        return (
            <View style={styles.main}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                    <Icon name='settings' color='white'/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        marginRight:10
    }
});