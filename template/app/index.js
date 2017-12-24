import { withAuthenticator } from 'aws-amplify-react-native';
import Amplify from 'aws-amplify-react-native';
import React, { Component } from 'react';
import { Tabs, Root } from './config/router';
import aws_exports from '../src/aws-exports';
Amplify.Configure(aws_exports);
class App extends Component {
  render() {
    return <Root />;
  }
}

export default withAuthenticator(App);
