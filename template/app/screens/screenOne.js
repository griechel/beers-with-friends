import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class ScreenOne extends Component {
    render() {
        return (
            <View style={styles.main} />
        );
    }
}

const styles = StyleSheet.create({
    main: {
        width:100+'%',
        height:100+'%',
        backgroundColor:'green'
    }
});