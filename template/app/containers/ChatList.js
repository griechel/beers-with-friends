import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ChatItem from './ChatItem';
import firebase from 'firebase';

export default class ChatList extends Component {

    conversationsRef = firebase.database().ref('conversations');

    constructor(){
        super();
        this.state = {
            chats: []
        }
    }

    componentDidMount() {
        this.loadConversations();
    }
      
    // retrieve the messages from the Backend
    loadConversations = () => {
        this.conversationsRef.once('value', (snap) => {
            var chatArray =[];
            this.getItems(snap, chatArray);
            this.setState({chats: chatArray});
            console.log(snap.val());
            console.log(this.state.chats)
        });
    }

    getItems = (snap, items) => {
        snap.forEach((child) => {
            items.push({
                id: child.key,
                title: child.val().title,
                lastMessage: child.val().lastMessage,
                date: child.val().date
            });
        });
    }

    _renderEvent = ({item}) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EventChatStack')}>
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