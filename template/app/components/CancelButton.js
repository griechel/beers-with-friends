import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';

export default class CancelButton extends Component {
    render() {
        return (
            <View style={styles.main}>
                <Button 
                    onPress={() => this.props.navigation.navigate('Events')}
                    title='Cancel'
                    color='white'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        marginRight:10
    }
});