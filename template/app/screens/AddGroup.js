import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, AsyncStorage } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import firebase from 'firebase';

import AddGroupList from '../containers/AddGroupList';

export default class AddGroup extends Component {

    constructor(){
        super();
        this.state = {
            members: [],
            groupName:'',
            myUID:''
        }
    }

    componentDidMount() {
        this.loadData();
    }
    
    // get user id, define db references and get data
    async loadData(){   
        var myKey = ''
        try {
            myKey = await AsyncStorage.getItem('myUID');
            this.setState({myUID: myKey})
        } catch (error) {
          // Error retrieving data
        }
    }

    createGroup = () => {
        var newGroupRef = firebase.database().ref('groups/' + this.state.myUID).push();
        var memberList = {};
        for (var i=0; i<this.state.members.length; i++) {
            memberList['members/' + this.state.members[i].id] = {
                name: this.state.members[i].name,
                picture: this.state.members[i].picture
            }
        };
        memberList['name'] = this.state.groupName
        newGroupRef.update(memberList);
        console.log(newGroupRef)
        console.log(this.state.members)
        this.props.navigation.dispatch(NavigationActions.back())
    }

    addUser = (user) => {
        userList= this.state.members
        if (userList.indexOf(user) == -1) {
            userList.push(user);
        } else {
            userList.splice(userList.indexOf(user), 1);
        }
        this.setState({members: userList})
    }

    createList(userArray) {
        userList=''
        for (var i=0; i<userArray.length; i++) {
            if (i==0) {
                userList= userList + userArray[i].name
            } else {
                userList= userList + ', ' + userArray[i].name
            }
        }
        return userList;
    }

    showBanner() {
        banner=false
        if (this.state.members.length > 0) {
            banner=true
        }
        return banner;
    }

    render() {
        return (
            <View style={styles.main}>
                <SearchBar 
                    noIcon
                    //lightTheme
                    placeholder='Type Group Name Here'
                    onChangeText={(name) => this.setState({ groupName: name })}
                />
                <View style={{flex:1}}>
                    <AddGroupList onSelectUser={this.addUser}/>
                </View>
                {this.showBanner() && <View style={styles.banner}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                        <Text style={styles.sendText}>{this.createList(this.state.members)}</Text>
                    </ScrollView>
                    <Button 
                        onPress={()=> this.createGroup()} 
                        title='Done'
                        color='white' 
                        />
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        width:100+'%',
        height:100+'%',
        backgroundColor:'white'
    },
    button: {
        backgroundColor: 'rgb(28,135,206)',
        bottom:20,
        right:20,
        position:'absolute',
    },
    banner: {
        flexDirection:'row',
        height:35,
        width:100+'%',
        bottom:0,
        position:'absolute',
        backgroundColor:'rgba(28,135,206,.9)',
    },
    scroll: {
        flexGrow:1,
        alignItems:'center',
    },
    sendText: {
        color:'white',
        paddingLeft:10
    }
});