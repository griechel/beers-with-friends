import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';

import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';

class EventChat extends Component {
    
    messagesRef = firebase.database().ref('messages/' + this.props.event.id);
    chatListRef = firebase.database().ref('chatList').orderByChild(this.props.event.id).equalTo(this.props.event.id)

    constructor(props){
        super(props);
        this.state = {
           messages: []
        }
    }

      componentDidMount() {
        this.loadMessages((message) => {
          this.setState((previousState) => {
            return {
              messages: GiftedChat.append(previousState.messages, message),
            };
          });
        });
      }

      componentWillUnmount() {
        this.messagesRef.off()
      }
      
      // retrieve the messages from the Backend
      loadMessages(callback) {
        this.messagesRef.off();
        const onReceive = (data) => {
          const message = data.val();
          callback({
            _id: data.key,
            text: message.text,
            createdAt: new Date(message.createdAt),
            user: {
              _id: message.user._id,
              name: message.user.name,
            },
          });
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
      }
      
      // send the message to the Backend
      sendMessage(message) {
        for (let i = 0; i < message.length; i++) {
          this.messagesRef.push({
            text: message[i].text,
            user: message[i].user,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
          });
        }
      }
    
      render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(message) => this.sendMessage(message)}
                //loadEarlier={true}
                user={{
                _id: this.props.user.uid,
                name: this.props.user.first_name
                }}
            />
        );
      }
}

export default connect(store => ({
  user: store.user,
  event: store.event
}),
(dispatch) => ({
  actions: bindActionCreators(userActions, dispatch)
})
)(EventChat);

const styles = StyleSheet.create({

});