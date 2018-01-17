import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ChatItem from './ChatItem';

export default class ChatList extends Component {
    constructor(){
        super();
        this.state = {
            chats: [
                {id:1, from:'Garren', subject:'Rose n Crown?', time:'Today'},
                {id:2, from:'James', subject:'Trivia', time:'Tomorrow'},
                {id:3, from:'Garren', subject:'Old la Honda', time:'Next Week'}
            ]
        }
    }
    _renderEvent(item){
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EventChat')}>
                <ChatItem name={item.from} body={item.subject} time={item.time}/>
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
                    renderItem={({item})=>this._renderEvent(item)}
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