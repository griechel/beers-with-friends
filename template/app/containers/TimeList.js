import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import TimeItem from './TimeItem';

export default class TimeList extends Component {
    constructor(){
        super();
        this.state = {
            times: [
                {id:1, time:'Today'},
                {id:2, time:'Tomorrow'},
                {id:3, time:'This Week'},
                {id:4, time:'This Weekend'},
                {id:5, time:'Next Week'}
            ]
        }
    }
    _renderEvent(item){
        return(
            <TouchableOpacity onPress={() => this.props.onSelectTime(item.time)}>
                <TimeItem time={item.time}/>
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

    render(){
        return(
            <View>
                <FlatList 
                    data= {this.state.times}
                    renderItem={({item})=>this._renderEvent(item)}
                    ItemSeparatorComponent= {this.renderSeparator}
                    keyExtractor={(item, index) => index}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});