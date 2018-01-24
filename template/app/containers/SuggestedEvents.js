import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';

import SuggestedEventItem from '../containers/SuggestedEventItem';

export default class SuggestedEvents extends Component {
    constructor(){
        super();
        this.state = {
            friends: [
                {id:1, name:'Beers'},
                {id:2, name:'Bike'},
                {id:3, name:'Lift'},
            ],
            recent: [
                {id:1, name:'Rose n Crown'},
                {id:2, name:'Dinner at Palantir'},
            ]
        }
    }
    _renderEvent = ({item}) => {
        return(
            <TouchableOpacity onPress={() => this.props.onSelectEvent(item.name)}>
                <SuggestedEventItem name={item.name} />
            </TouchableOpacity>
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

    render() {
        return (
            <View style={styles.main}>
            <SectionList 
                renderItem={this._renderEvent}
                renderSectionHeader={({section})=> <Text style={styles.sectionHeader}>{section.title}</Text>}
                ItemSeparatorComponent= {this.renderSeparator}
                sections={[
                    {data:this.state.recent, title: 'recent'},
                    {data:this.state.friends, title:'Suggested'}
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
        backgroundColor: 'white'
    },
    sectionHeader: {
        fontSize:14,
        fontWeight:'bold',
        //alignSelf:'center'
    }
});