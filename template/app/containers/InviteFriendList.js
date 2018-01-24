import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import InviteFriendItem from './InviteFriendItem';
import PublicSwitch from '../components/PublicSwitch';

import { BestFriends, Friends, Groups } from '../config/data';

export default class InviteFriendList extends Component {

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
                <PublicSwitch />
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