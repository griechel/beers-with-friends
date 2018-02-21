import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList, AsyncStorage } from 'react-native';
import EventItem from './EventItem';
import firebase from 'firebase';

import { PrivateEvents, PublicEvents } from '../config/data';

export default class EventList extends Component {
    constructor(){
        super();
        this.state = {
            privateInvites: [],
            publicInvites:[]
        }
    }

    componentDidMount() {
        this.loadData();
    }
    
    // get user id, define db references and get data
    loadData(){   
        var myKey = this.props.uid
        invitesRef = firebase.database().ref('invites/' + myKey)
        this.loadPrivateInvites(invitesRef);
        this.loadPublicInvites(invitesRef);
    }

    // retrieve private invites from the Backend
    loadPrivateInvites = (invitesRef) => {
        invitesRef.orderByChild('public').equalTo(false).once('value', (snap) => {
            var tempArray =[];
            this.getItems(snap, tempArray);
            this.setState({privateInvites: tempArray});
        });
    }

     // retrieve public invites from the Backend
     loadPublicInvites = (invitesRef) => {
        invitesRef.orderByChild('public').equalTo(true).once('value', (snap) => {
            var tempArray =[];
            this.getItems(snap, tempArray);
            this.setState({publicInvites: tempArray});
        });
    }

    getItems = (snap, items) => {
        snap.forEach((child) => {
            items.push({
                id: child.key,
                name: child.val().name,
                members: child.val().members,
                date: child.val().date,
            });
        });
    }

    renderEvent = ({item}) => {
        return(
            <View>
                <EventItem name={item.members} body={item.name} time={item.date}/>
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
                    renderItem={this.renderEvent}
                    renderSectionHeader={this.renderSectionHeader}
                    ItemSeparatorComponent= {this.renderSeparator}
                    sections={[
                        {data:this.state.privateInvites, title:'Private'},
                        {data:this.state.publicInvites, title:'Public'}
                    ]}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{paddingBottom:35, backgroundColor:'rgba(0,0,0,0)'}}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        width:100+'%',
        height:100+'%',
        backgroundColor:'rgb(230,230,230)'
    },
    sectionHeader: {
        backgroundColor:'rgb(220,220,220)',
        justifyContent:'center',
        alignItems:'center'
    },
    sectionHeaderText: {
        fontSize:14,
        fontWeight:'bold',
        color:'rgb(28,135,206)'
    }
});