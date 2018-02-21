import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, AsyncStorage} from 'react-native';
import ChatItem from './ChatItem';
import firebase from 'firebase';

export default class ChatList extends Component {

    constructor(){
        super();
        this.state = {
            chats: []
        }
    }

    componentDidMount() {
        this.loadData();
    }
    
    // get user id, define db references and get data
    loadData(){   
        var myKey = this.props.uid
        chatsRef = firebase.database().ref('chatList/' + myKey)
        this.loadChats(chatsRef);
    }

    // retrieve groups from the Backend
    loadChats = (chatsRef) => {
        chatsRef.once('value', (snap) => {
            var tempArray =[];
            this.getItems(snap, tempArray);
            this.setState({chats: tempArray});
        });
    }

    getItems = (snap, items) => {
        snap.forEach((child) => {
            items.push({
                id: child.key,
                title: child.val().name,
                lastMessage: child.val().lastSender + ': ' + child.val().lastMessage,
                date: child.val().date
            });
        });
    }

    _renderEvent = ({item}) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EventChat',{eventID: item.id})}>
                <ChatItem id={item.id} title={item.title} lastMessage={item.lastMessage} date={item.date}/>
            </TouchableOpacity>
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
                <FlatList 
                    data= {this.state.chats}
                    renderItem={this._renderEvent}
                    ItemSeparatorComponent= {this.renderSeparator}
                    keyExtractor={(item, index) => index}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        width:100+'%',
        height:100+'%',
        backgroundColor: 'rgb(230,230,230)',
        marginTop:5
    }
});