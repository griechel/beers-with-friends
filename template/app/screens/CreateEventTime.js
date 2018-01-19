import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity} from 'react-native';
import { SearchBar } from 'react-native-elements';
import TimeList from '../containers/TimeList';

export default class CreateEventTime extends Component {

    constructor (props){
        super(props);
        this.state= {
            eventName:this.props.navigation.state.params.event,
            timeValue:''
        }
    }

    inputTime = (time) => {
        this.setState({timeValue:time});
    }

    render() {
        return (
            <View style={styles.main}>
                <SearchBar 
                    noIcon
                    lightTheme
                    value={this.state.eventName}
                    editable={false}
                    />
                <SearchBar 
                    noIcon
                    lightTheme
                    placeholder='When should we do this?'
                    onChangeText={(timeValue) => this.setState({ timeValue })}
                    value={this.state.timeValue}
                    />
                <TimeList onSelectTime={this.inputTime}/>
                {this.state.timeValue!='' && <View style={styles.button}>
                    <Button 
                        onPress={()=> this.props.navigation.navigate('CreateEventInvites')} 
                        title='Next'
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
    },
    button: {
        backgroundColor: 'rgb(28,135,206)',
        bottom:20,
        right:20,
        position:'absolute',
    }
});