import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import EventItem from './EventItem';

import { PrivateEvents, PublicEvents } from '../config/data';

export default class EventList extends Component {
    constructor(){
        super();
        this.state = {
            events: [
                {id:1, from:'Garren', subject:'Rose n Crown?', time:'Today'},
                {id:2, from:'James', subject:'Trivia', time:'Tomorrow'},
                {id:3, from:'Garren', subject:'Old la Honda', time:'Next Week'}
            ]
        }
    }
    renderEvent(item){
        return(
            <View>
                <EventItem name={item.attendees} body={item.subject} time={item.time}/>
            </View>
        );
    }

    renderSectionHeader(section){
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
                    renderItem={({item})=>this.renderEvent(item)}
                    renderSectionHeader={({section})=> this.renderSectionHeader(section)}
                    ItemSeparatorComponent= {this.renderSeparator}
                    sections={[
                        {data:PrivateEvents, title:'Private'},
                        {data:PublicEvents, title:'Public'}
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