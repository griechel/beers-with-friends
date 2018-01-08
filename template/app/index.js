import React, { Component } from 'react';
import { Tabs, Root } from './config/router';
import { withAuthenticator } from 'aws-amplify-react-native';

class App extends Component {
  render() {
    <View>
      <Text>Welcome to the Facebook SDK for React Native!</Text>
      <Login />
     </View>
  }
}

export default withAuthenticator(App);
