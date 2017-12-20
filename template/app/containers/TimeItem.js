import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Avatar } from 'react-native-elements';

export default class TimeItem extends Component {

    render(){
        return(
            <View style={styles.main}>
                <View style={styles.box2}>
                        <Text style={styles.name}>{this.props.time}</Text>
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
    }
  });