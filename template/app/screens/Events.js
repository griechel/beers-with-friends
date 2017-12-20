import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import EventList from '../containers/EventList';
import AddButton from '../components/AddButton';

export default class Events extends Component {
    render() {
        return (
            <View style={styles.main}>
                <StatusBar barStyle='light-content' />
                <EventList />
                <AddButton navigation={this.props.navigation}/>
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
});