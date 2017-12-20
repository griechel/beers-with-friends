import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class SuggestedEventItem extends Component {

    render(){
        return(
            <View style={styles.main}>
                <View style={styles.box1}>
                    <View style={styles.circle}/>
                </View>
                <View style={styles.box2}>
                        <Text style={styles.name}>{this.props.name}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
      flexDirection:'row',
      width:100+'%',
    },
    box1: {
      width:60,
      height:60,
      justifyContent:'center',
      alignItems:'center'
    },
    box2: {
      flex:1,
      height:60,
      justifyContent:'center',
      //alignItems:'center'
    },
    name: {
      paddingLeft:5,
    },
    circle: {
      height:40,
      width:40,
      backgroundColor:'orange',
      borderRadius:35,
      position:'absolute'
    }
  });