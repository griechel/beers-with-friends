import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';

import EventList from '../containers/EventList';
import AddButton from '../components/AddButton';

class Events extends Component {
    render() {
        return (
            <View style={styles.main}>
                <StatusBar barStyle='light-content' />
                <EventList user={this.props.user}/>
                <AddButton navigation={this.props.navigation}/>
            </View>
        );
    }
}

export default connect(store => ({
    user: store.user
  }),
  (dispatch) => ({
    actions: bindActionCreators(userActions, dispatch)
  })
  )(Events);

const styles = StyleSheet.create({
    main: {
        width:100+'%',
        height:100+'%',
        backgroundColor:'white'
    },
});