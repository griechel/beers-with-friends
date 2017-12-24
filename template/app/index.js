import React, { Component } from 'react';
import { Tabs, Root } from './config/router';
import { withAuthenticator } from 'aws-amplify-react-native';

class App extends Component {
  render() {
    return <Root />;
  }
}

export default withAuthenticator(App);
