import React, { Component } from 'react';
import { Tabs, Root } from './config/router';
import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify from 'aws-amplify-react-native';
import aws_exports from '../src/aws-exports';
Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return <Root />;
  }
}

export default withAuthenticator(App);
