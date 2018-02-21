import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { bindActionCreators } from 'redux';
import * as counterActions from '../actions/counterActions';
import { connect } from 'react-redux';

import Counter from '../components/Counter';

class Settings extends Component {
    
    render() {
        const { counter, user, actions } = this.props;
        return (
          <Counter
            counter={counter.count}
            user={user}
            {...actions} />
        );
      }
}

export default connect(store => ({
    counter: store.counter,
    user: store.user
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(Settings);

const styles = StyleSheet.create({
    main: {
        width:100+'%',
        height:100+'%',
        backgroundColor:'green'
    }
});