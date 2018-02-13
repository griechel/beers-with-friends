import React, { Component } from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import { SearchBar } from 'react-native-elements';

import SendEvent from '../components/SendEvent';
import SuggestedEvents from '../containers/SuggestedEvents';

export default class CreateEvent extends Component {

    constructor (){
        super();
        this.state= {
            eventLabel:'What do you want to do?',
            eventValue:''
        }
    }

    inputEvent = (event) => {
        this.setState({eventValue:event});
    }

    render() {
            return (
                <View style={styles.main}>
                    <SearchBar 
                        noIcon
                        lightTheme
                        placeholder={this.state.eventLabel}
                        onChangeText={(eventValue) => this.setState({ eventValue })}
                        value={this.state.eventValue}
                        />
                    <SuggestedEvents onSelectEvent={this.inputEvent}/>
                    
                    {this.state.eventValue!='' && <View style={styles.button}>
                        <Button 
                            onPress={()=> this.props.navigation.navigate('CreateEventTime', {event:this.state.eventValue})} 
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