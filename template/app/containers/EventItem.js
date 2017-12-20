import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';

export default class EventItem extends Component {

    render(){
        return(
            <Swipeout right={swipeoutBtns} backgroundColor='white' autoClose={true}>
                <View style={styles.main}>
                    <View style={styles.box1}>
                    <Avatar small rounded />
                    </View>
                    <View style={styles.box2}>
                        <View style={styles.topLine}>
                            <Text style={styles.from}>{this.props.name}</Text>
                            <Text style={styles.time}>{this.props.time}</Text>
                        </View>
                        <Text style={styles.body}>{this.props.body}</Text>
                    </View>
                </View>
            </Swipeout>
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
    thumbsUp: {
        flex:1,
        justifyContent:'center'
    },
    thumbsDown: {
        flex:1,
        justifyContent:'center'
    }
  });

  var swipeoutBtns = [
    {
        text:'In',
        backgroundColor:'green',
        color:'black',
        component:
        (
          <View style={styles.thumbsUp}>
            <Icon 
                name='thumb-up'
                color='white'
                size={30}
            />
          </View>
        )
    },
    {
        text:'Out',
        backgroundColor:'red',
        component:
        (
          <View style={styles.thumbsDown}>
            <Icon 
                name='thumb-down'
                color='white'
                size={30}
            />
          </View>
        )
    }
]