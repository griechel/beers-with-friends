import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import InviteFriendItem from './InviteFriendItem';

import { BestFriends, Friends, Groups } from '../config/data';

export default class InviteFriendList extends Component {

    _renderEvent(item){
        return(
            <View>
                <InviteFriendItem user={item} onSelectUser={this.props.onSelectUser}/>
            </View>
        );
    }

    renderSeparator = () => {
        return(
            <View 
                style={{
                    height:1,
                    width:100+'%',
                    backgroundColor:'black',
                }}
                />
        );
    }

    render(){
        return(
            <View style={styles.main}>
                <SectionList 
                    renderItem={({item})=>this._renderEvent(item)}
                    renderSectionHeader={({section})=> <Text style={styles.sectionHeader}>{section.title}</Text>}
                    ItemSeparatorComponent= {this.renderSeparator}
                    sections={[
                        {data:Groups, title:'Groups'},
                        {data:BestFriends, title:'My Main Crew'},
                        {data:Friends, title:'I Guess I Like These People Too'}
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
        backgroundColor: 'white'
    },
    sectionHeader: {
        fontSize:14,
        fontWeight:'bold',
        //alignSelf:'center'
    }
});