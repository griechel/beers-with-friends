import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import firebase from 'firebase';

export default class EventItem extends Component {
    
    accept() {
        var inviteRef = firebase.database().ref('invites/' + this.props.user.uid + '/' + this.props.id)
        var chatListRef = firebase.database().ref('chatList/' + this.props.user.uid + '/' + this.props.id)
        var eventsRef = firebase.database().ref('events/' + this.props.id + '/members/' + this.props.user.uid)
        chatListRef.update({
            name: this.props.body,
            date: this.props.time,
            lastMessage: 'Joined the group',
            lastSender: this.props.user.first_name
        }) 
        eventsRef.update({
            name: this.props.user.first_name + ' ' + this.props.user.last_name
        })
        inviteRef.remove()
    }

    reject() {
        var inviteRef = firebase.database().ref('invites/' + this.props.user.uid + '/' + this.props.id)
        inviteRef.update({declined: true})
    }

    render(){
        return(
            <Swipeout right={this.swipeoutBtns} backgroundColor='white' autoClose={true}>
                <View style={styles.main}>
                    <View style={styles.box1}>
                    <Avatar small rounded />
                    </View>
                    <View style={styles.box2}>
                        <View style={styles.topLine}>
                            <Text style={styles.from}>{this.props.name}</Text>
                            <Text style={styles.time}>{this.props.time}</Text>
                        </View>
                        <Text style={styles.body}>{this.props.body}</Text>
                    </View>
                </View>
            </Swipeout>
        );
    }

    swipeoutBtns = [
        {
            text:'In',
            backgroundColor:'green',
            color:'black',
            onPress: () => this.accept(),
            component:
            (
              <View style={styles.thumbsUp}>
                <Icon 
                    name='thumb-up'
                    color='white'
                    size={30}
                />
              </View>
            )
        },
        {
            text:'Out',
            backgroundColor:'red',
            onPress:()=> this.reject(),
            component:
            (
              <View style={styles.thumbsDown}>
                <Icon 
                    name='thumb-down'
                    color='white'
                    size={30}
                />
              </View>
            )
        }
    ]
}

const styles = StyleSheet.create({
    main: {
      flexDirection:'row',
      width:100+'%',
    },
    box1: {
      width:60,
      height:60,
      justifyContent:'center',
      alignItems:'center'
    },
    box2: {
      flex:1,
      height:60,
      justifyContent:'flex-start'
    },
    topLine: {
      flexDirection:'row',
      justifyContent:'space-between',
      paddingTop:5,
    },
    from: {
      paddingLeft:5
    },
    body: {
      color:'rgb(150,150,150)',
      paddingLeft:5
    },
    time: {
      color:'black',
      paddingRight:5
    },
    thumbsUp: {
        flex:1,
        justifyContent:'center'
    },
    thumbsDown: {
        flex:1,
        justifyContent:'center'
    }
  });
