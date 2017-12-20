import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

export default class ChatItem extends Component {

    render(){
        return(
            <View style={styles.main}>
                <View style={styles.box1}>
                <Avatar 
                    small 
                    rounded 
                    overlayContainerStyle={{backgroundColor:'blue'}}
                    icon={{name:'local-drink', color:'white'}}
                />
                </View>
                <View style={styles.box2}>
                    <View style={styles.topLine}>
                        <Text style={styles.from}>{this.props.body}</Text>
                        <Text style={styles.time}>{this.props.time}</Text>
                    </View>
                    <Text style={styles.body}>{this.props.name}: blah blah blah</Text>
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
      justifyContent:'flex-start'
    },
    topLine: {
      flexDirection:'row',
      justifyContent:'space-between',
      paddingTop:5,
    },
    from: {
      paddingLeft:5
    },
    body: {
      color:'rgb(150,150,150)',
      paddingLeft:5
    },
    time: {
      color:'black',
      paddingRight:5
    },
    circle: {
      height:40,
      width:40,
      backgroundColor:'orange',
      borderRadius:35,
      position:'absolute'
    }
  });