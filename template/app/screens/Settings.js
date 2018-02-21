import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import Counter from '../components/Counter';
import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';

class Settings extends Component {
    constructor(props) {
        super(props);
      }
    
    render() {
        const { state, actions } = this.props;
        return (
          <Counter
            counter={state.count}
            {...actions} />
        );
      }
}

export default connect(state => ({
    state: state.user
  }),
  (dispatch) => ({
    actions: bindActionCreators(userActions, dispatch)
  })
)(Settings);

const styles = StyleSheet.create({
    main: {
        width:100+'%',
        height:100+'%',
        backgroundColor:'green'
    }
});