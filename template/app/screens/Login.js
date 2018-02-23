import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import FBSDK, { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { firebaseRef } from '../config/firebase';
import firebase from 'firebase';

import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';

class Login extends Component {

  constructor(){
    super();
    this.state = {
      showSpinner: true,
      counter: 1,
    }
  }

  componentDidMount() {
    this.fireBaseListener = firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        this.firebaseRef = firebase.database().ref('users')
        this.firebaseRef.child(auth.uid).on('value', snap => {
          const user = snap.val()
          if (user != null) {
            this.firebaseRef.child(auth.uid).off('value')
            this.setState({ showSpinner: false })
            this.props.actions.storeUser(user)
            this.props.navigation.navigate('Tabs');
          }
        })
      } else {
        this.setState({ showSpinner: false })
      }
    })
  }
  
  _fbAuth() {
    this.setState({ showSpinner: true })
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
      .then((result) => this._handleCallBack(result),
      function (error) {
        alert('Login fail with error: ' + error);
      }
      )
  }
  _handleCallBack(result) {
    let _this = this
    if (result.isCancelled) {
      alert('Login cancelled');
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          const token = data.accessToken
          fetch('https://graph.facebook.com/v2.8/me?fields=id,first_name,last_name,name&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
              const imageSize = 120
              const facebookID = json.id
              const fbImage = `https://graph.facebook.com/${facebookID}/picture?height=${imageSize}`
              this.authenticate(data.accessToken)
                .then(function (result) {
                  const { uid } = result
                  _this.createUser(uid, json, token, fbImage)
                })


            })
            .catch(function (err) {
              console.log(err);
            });
        }
      )

    }
  }

  authenticate = (token) => {
    const provider = firebase.auth.FacebookAuthProvider
    const credential = provider.credential(token)
    let ret = firebase.auth().signInWithCredential(credential)
    return ret;
  }

  createUser = (uid, userData, token, dp) => {
    const defaults = {
      uid,
      token,
      dp
    }
    firebase.database().ref('users').child(uid).update({ ...userData, ...defaults })
      // stores user id in local device storage. not sure if i still need this
      .then((user) => {
        firebase.database().ref('users').child(uid).once('value')
          .then(async (snapshot) => {
          try {
            await AsyncStorage.setItem('myUID', snapshot.val().uid);
          } catch (error) {
            // Error saving data
          }
        })
      })

  }

  loginText() {
    return(
      <Text>Logged in</Text>
    )
  }


  // async getKey(){
  //   return await AsyncStorage.getItem('myUID');
  // }


  async testRequestGraphAPI(){   
    var myKey = ''
      this.setState({ showSpinner: true}) 
    try {
      myKey = await AsyncStorage.getItem('myUID');
      if (myKey !== null) {
        alert(myKey)
      }
    } catch (error) {
      // Error retrieving data
    }
    firebase.database().ref('users/' + myKey ).orderByChild('createdAt').limitToLast(this.state.counter).on('value',
     (snapshot) => {
     if (snapshot.val()) {
       alert("Data Received From Firebase " + JSON.stringify(snapshot.val()))
     }
     else {
       alert("error occured ")
     }
     this.setState({ showSpinner: false })
   })

  }

  render() {  
    return (
      this.state.showSpinner ? <View style={styles.container}><ActivityIndicator animating={this.state.showSpinner} /></View> :
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this._fbAuth()}>
          <Text>Login with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.testRequestGraphAPI()}>
          <Text>Get Name</Text>
        </TouchableOpacity>
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
)(Login);

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
