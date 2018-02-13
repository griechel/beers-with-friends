import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-elements';

export default class InviteFriendItem extends Component {
    constructor(){
        super();
        this.state = {
           filled:false
        }
    }

    selectRow(){
        this.setState({ filled: !this.state.filled});
        this.props.onSelectUser(this.props.user);
    }

    render(){
        return(
            <TouchableOpacity 
                style={styles.main}
                onPress={this.selectRow.bind(this)}
            >
                <View style={styles.box1}>
                    <Avatar 
                        small 
                        rounded 
                        source={{uri:this.props.user.picture}}
                    />
                </View>
                <View style={styles.box2}>
                        <Text style={styles.name}>{this.props.user.name}</Text>
                </View>
                <View 
                    style={this.state.filled ? styles.filled : styles.empty}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    main: {
      flexDirection:'row',
      width:100+'%',
      backgroundColor: 'white'
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
    filled: {
        height:30,
        width:30,
        borderWidth:3,
        backgroundColor:'orange',
        borderColor:'orange',
        alignSelf:'center',
        marginRight:20
    },
    empty: {
        height:30,
        width:30,
        borderWidth:3,
        borderColor:'grey',
        alignSelf:'center',
        marginRight:20
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