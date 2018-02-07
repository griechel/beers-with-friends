import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyD5RIkOJa4YFP4nF-5fNEW-g_1UV8ZzuvM',
  authDomain: 'beerswithfriends-7d04a.firebaseapp.com/',
  databaseURL: 'https://beerswithfriends-7d04a.firebaseio.com/'
}

const firebaseRef = firebase.initializeApp(config)