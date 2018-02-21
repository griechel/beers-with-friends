import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, AsyncStorage } from 'react-native';
import firebase from 'firebase';

import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';

import InviteFriendList from '../containers/InviteFriendList';

class CreateEventInvites extends Component {

    constructor(props){
        super(props);
        this.state = {
            eventName:this.props.navigation.state.params.event,
            eventTime:this.props.navigation.state.params.time,
            members: [],
            myUID:'',
            public: true
        }
    }

    createEvent = () => {
        var newEventRef = firebase.database().ref('events/').push();
        var updateList = {};
        for (var i=0; i<this.state.members.length; i++) {
            updateList['members/' + this.state.members[i].id] = {
                name: this.state.members[i].name,
                //picture: this.state.members[i].picture
            }
        };
        updateList['members/' + this.props.user.uid] = true;
        updateList['name'] = this.state.eventName;
        updateList['time'] = this.state.eventTime;
        updateList['public'] = this.state.public;
        newEventRef.update(updateList);
        
        var eventMetaRef = firebase.database().ref('chatList/' + this.props.user.uid).child(newEventRef.key).update({
            name: this.state.eventName,
            date: this.state.eventTime,
            lastSender: 'Me',
            lastMessage: 'Lets do it!'
        })
        this.props.navigation.navigate('Events')
    }

    addUser = (user) => {
        userList= this.state.members
        if (userList.indexOf(user) == -1) {
            userList.push(user);
        } else {
            userList.splice(userList.indexOf(user), 1);
        }
        this.setState({members: userList})
    }

    createList(userArray) {
        userList=''
        for (var i=0; i<userArray.length; i++) {
            if (i==0) {
                userList= userList + userArray[i].name
            } else {
                userList= userList + ', ' + userArray[i].name
            }
        }
        return userList;
    }

    showBanner() {
        banner=false
        if (this.state.members.length > 0) {
            banner=true
        }
        return banner;
    }

    togglePublic = () => {
        this.setState({public: !this.state.public});
        console.log(this.state.public)
    }

    render() {
        return (
            <View style={styles.main}>
                <InviteFriendList onSelectUser={this.addUser} public={this.togglePublic} uid={this.props.user.uid}/>
                {this.showBanner() && <View style={styles.banner}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                        <Text style={styles.sendText}>{this.createList(this.state.members)}</Text>
                    </ScrollView>
                    <Button 
                        onPress={()=> this.createEvent()} 
                        title='Send'
                        color='white' 
                        />
                </View>}
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
  )(CreateEventInvites);

const styles = StyleSheet.create({
    main: {
        width:100+'%',
        height:100+'%',
        backgroundColor:'white'
    },
    button: {
        backgroundColor: 'rgb(28,135,206)',
        bottom:20,
        right:20,
        position:'absolute',
    },
    banner: {
        flexDirection:'row',
        height:35,
        width:100+'%',
        bottom:0,
        position:'absolute',
        backgroundColor:'rgba(28,135,206,.9)',
    },
    scroll: {
        flexGrow:1,
        alignItems:'center',
    },
    sendText: {
        color:'white',
        paddingLeft:10
    }
});