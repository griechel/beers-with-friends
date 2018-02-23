import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList, AsyncStorage } from 'react-native';
import FriendItem from './FriendItem';
import ChatList from './ChatList';
import firebase from 'firebase';

import { BestFriends, Friends, Groups } from '../config/data';

export default class FriendList extends Component {
    
    constructor(){
        super();
        this.state = {
            friends: [],
            bestFriends: [],
            groups: []
        }
    }

    componentDidMount() {
        this.loadData();
    }
    
    // get user id, define db references and get data
    loadData(){   
        var myKey = this.props.uid
        groupsRef = firebase.database().ref('groups/' + myKey)
        friendsRef = firebase.database().ref('friends/' + myKey)
        this.loadGroups(groupsRef);
        this.loadBestFriends(friendsRef);
        this.loadFriends(friendsRef);
    }

    loadGroups = (groupsRef) => {
        groupsRef.on('value', (snap) => {
            var tempArray =[];
            this.getItems(snap, tempArray);
            this.setState({groups: tempArray});
        });
    }

    loadBestFriends = (friendsRef) => {
        friendsRef.orderByChild('best').equalTo(true).on('value', (snap) => {
            var tempArray =[];
            this.getItems(snap, tempArray);
            this.setState({bestFriends: tempArray});
        });
    }

    loadFriends = (friendsRef) => {
        friendsRef.orderByChild('best').equalTo(false).on('value', (snap) => {
            var tempArray =[];
            this.getItems(snap, tempArray);
            this.setState({friends: tempArray});
        });
    }

    getItems = (snap, items) => {
        snap.forEach((child) => {
            items.push({
                id: child.key,
                name: child.val().name,
                picture: child.val().dp,
            });
        });
    }

    demoteFriend(friendID) {
        var friendRef = firebase.database().ref('friends/' + this.props.uid + '/' + friendID)
        friendRef.update({best: false})
    }

    promoteFriend(friendID) {
        var friendRef = firebase.database().ref('friends/' + this.props.uid + '/' + friendID)
        friendRef.update({best: true})
    }

    _renderGroups = ({item}) => {

        groupBtns = [
            {
                text:'Edit',
                backgroundColor:'green'
            },
            {
                text:'Delete',
                backgroundColor:'red'
            }
        ]

        return(
            <View>
                <FriendItem 
                    name={item.name}
                    picture={item.picture}
                    swipeoutBtns={groupBtns}
                />
            </View>
        );
    }

    _renderBestFriends = ({item}) => {

        bestFriendBtns = [
            {
                text:'Remove',
                backgroundColor:'orange',
                onPress: () => this.demoteFriend(item.id)
            }
        ]

        return(
            <View>
                <FriendItem 
                    name={item.name} 
                    picture={item.picture}
                    swipeoutBtns={bestFriendBtns}
                />
            </View>
        );
    }

    _renderFriends = ({item}) => {

        friendBtns = [
            {
                text:'Delete',
                backgroundColor:'red',
                //onPress: () => this.promoteFriend(item.id)
            },
            {
                text:'Best',
                backgroundColor:'blue',
                onPress: () => this.promoteFriend(item.id)
            }
        ]

        return(
            <View>
                <FriendItem 
                    name={item.name} 
                    picture={item.picture}
                    swipeoutBtns={friendBtns}
                />
            </View>
        );
    }

    renderSectionHeader = ({section}) => {
        return(
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{section.title}</Text>
            </View>
        );
    }

    renderSeparator = () => {
        return(
            <View 
                style={{
                    height:5,
                    width:100+'%',
                    backgroundColor:'rgba(256,256,256,0)',
                }}
                />
        );
    }

    render(){
        return(
            <View style={styles.main}>
                <SectionList 
                    renderSectionHeader={this.renderSectionHeader}
                    ItemSeparatorComponent= {this.renderSeparator}
                    sections={[
                        {data:this.state.groups, renderItem: this._renderGroups, title:'Groups'},
                        {data:this.state.bestFriends, renderItem: this._renderBestFriends, title:'My Main Crew'},
                        {data:this.state.friends, renderItem: this._renderFriends, title:'I Guess I Like These People Too'}
                    ]}
                    keyExtractor={(item, index) => index}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        height:100+'%',
        width:100+'%',
        backgroundColor: 'rgb(230,230,230)',
    },
    sectionHeader: {
        backgroundColor:'rgba(220,220,220,0)',
        justifyContent:'center',
        alignItems:'center'
    },
    sectionHeaderText: {
        fontSize:14,
        fontWeight:'bold',
        color:'rgb(28,135,206)'
    }
});