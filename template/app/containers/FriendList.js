import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import FriendItem from './FriendItem';
import ChatList from './ChatList';
import firebase from 'firebase';

import { BestFriends, Friends, Groups } from '../config/data';

export default class FriendList extends Component {

    groupsRef = firebase.database().ref('groups/NS1ukEbhQPaZzJLilsCL24Whfv23');
    friendsRef = firebase.database().ref('friends/NS1ukEbhQPaZzJLilsCL24Whfv23');
    
    constructor(){
        super();
        this.state = {
            friends: [],
            bestFriends: [],
            groups: []
        }
    }

    componentDidMount() {
        this.loadGroups();
        this.loadBestFriends();
        this.loadFriends();
    }
    
    // retrieve groups from the Backend
    loadGroups = () => {
        this.groupsRef.once('value', (snap) => {
            var tempArray =[];
            this.getItems(snap, tempArray);
            this.setState({groups: tempArray});
        });
    }

    // retrieve best friends from the Backend
    loadBestFriends = () => {
        this.friendsRef.orderByChild('best').equalTo(true).once('value', (snap) => {
            var tempArray =[];
            this.getItems(snap, tempArray);
            this.setState({bestFriends: tempArray});
        });
    }

    // retrieve friends from the Backend
    loadFriends = () => {
        this.friendsRef.orderByChild('best').equalTo(false).once('value', (snap) => {
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

    _renderGroups = ({item}) => {
        return(
            <View>
                <FriendItem 
                    name={item.name} 
                    title={item.title} 
                    picture={item.picture} 
                    type={item.type} 
                    swipeoutBtns={groupBtns}
                />
            </View>
        );
    }

    _renderBestFriends = ({item}) => {
        return(
            <View>
                <FriendItem 
                    name={item.name} 
                    title={item.title} 
                    picture={item.picture} 
                    type={item.type} 
                    swipeoutBtns={bestFriendBtns}
                />
            </View>
        );
    }

    _renderFriends = ({item}) => {
        return(
            <View>
                <FriendItem 
                    name={item.name} 
                    title={item.title} 
                    picture={item.picture} 
                    type={item.type} 
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

const groupBtns = [
    {
        text:'Edit',
        backgroundColor:'green'
    },
    {
        text:'Delete',
        backgroundColor:'red'
    }
]

const bestFriendBtns = [
    {
        text:'Remove',
        backgroundColor:'orange'
    }
]

const friendBtns = [
    {
        text:'Delete',
        backgroundColor:'red'
    }
]

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