import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyD5RIkOJa4YFP4nF-5fNEW-g_1UV8ZzuvM',
  authDomain: 'beerswithfriends-7d04a.firebaseapp.com/',
  databaseURL: 'https://beerswithfriends-7d04a.firebaseio.com/'
}

const firebaseRef = firebase.initializeApp(config)

export default class Login extends Component {
  
     _fbAuth() {
        LoginManager.logInWithReadPermissions(['public_profile', 'user_friends', 'email']).then(
           function(result) {
              if (result.isCancelled) {
                 alert('Login cancelled');
              } else {
                 AccessToken.getCurrentAccessToken().then((accessTokenData) => {
                   const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken)
                   firebase.auth().signInWithCredential(credential).then((result) => {
                     // Promise was successful
                   }, (error) => {
                     // Promise was rejected
                     console.log(error)
                   })
                 }, (error) => {
                   console.log('Some error occured' + error)
                 })
              }
           },
           function(error) {
              alert('Login fail with error: ' + error);
           }
        );
     }
  
     render() {
        return (
           <View style={styles.container}>
              <TouchableOpacity onPress={this._fbAuth}>
                 <Text>Login with Facebook</Text>
              </TouchableOpacity>
           </View>
        );
     }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
