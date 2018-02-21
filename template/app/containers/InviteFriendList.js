import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, AsyncStorage } from 'react-native';
import InviteFriendItem from './InviteFriendItem';
import PublicSwitch from '../components/PublicSwitch';
import firebase from 'firebase';

import { BestFriends, Friends, Groups } from '../config/data';

export default class InviteFriendList extends Component {

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
    async loadData(){   
        var myKey = this.props.uid
        groupsRef = firebase.database().ref('groups/' + myKey)
        friendsRef = firebase.database().ref('friends/' + myKey)
        this.loadGroups(groupsRef);
        this.loadBestFriends(friendsRef);
        this.loadFriends(friendsRef);
    }

    // retrieve groups from the Backend
    loadGroups = (groupsRef) => {
        groupsRef.once('value', (snap) => {
            var tempArray =[];
            this.getItems(snap, tempArray);
            this.setState({groups: tempArray});
        });
    }

    // retrieve best friends from the Backend
    loadBestFriends = (friendsRef) => {
        friendsRef.orderByChild('best').equalTo(true).once('value', (snap) => {
            var tempArray =[];
            this.getItems(snap, tempArray);
            this.setState({bestFriends: tempArray});
        });
    }

    // retrieve friends from the Backend
    loadFriends = (friendsRef) => {
        friendsRef.orderByChild('best').equalTo(false).once('value', (snap) => {
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

    _renderEvent = ({item}) => {
        return(
            <View>
                <InviteFriendItem user={item} onSelectUser={this.props.onSelectUser}/>
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

    renderHeader = () => {
        return(
            <View>
                <PublicSwitch public={this.props.public}/>
            </View>
        )
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
                    renderItem={this._renderEvent}
                    renderSectionHeader={this.renderSectionHeader}
                    ListHeaderComponent={this.renderHeader}
                    ItemSeparatorComponent= {this.renderSeparator}
                    sections={[
                        {data:this.state.groups, title:'Groups'},
                        {data:this.state.bestFriends, title:'My Main Crew'},
                        {data:this.state.friends, title:'I Guess I Like These People Too'}
                    ]}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{paddingBottom:35}}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        height:100+'%',
        width:100+'%',
        backgroundColor: 'rgb(230,230,230)'
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