import React from 'react';
import { TabNavigator, StackNavigator, Button, Text } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SettingsButton from '../components/SettingsButton';
import CancelButton from '../components/CancelButton';

import ScreenOne from '../screens/screenOne';
import Events from '../screens/Events';
import Friends from '../screens/Friends';
import Chat from '../screens/Chat';
import EventChat from '../screens/EventChat';
import CreateEvent from '../screens/CreateEvent';
import CreateEventTime from '../screens/CreateEventTime';
import CreateEventInvites from '../screens/CreateEventInvites';
import AddFriend from '../screens/AddFriend';
import Settings from '../screens/Settings';

export const FriendsStack = StackNavigator({
    Friends: {
        screen: Friends,
        navigationOptions: ({navigation}) => ({
            title: 'My Friends',
            headerStyle: { backgroundColor:'rgb(28,135,206)'},
            headerTitleStyle: { color:'white'},
            headerRight: <SettingsButton navigation={navigation}/>
        })
    }
});

export const EventsStack = StackNavigator({
    Events: {
        screen: Events,
        navigationOptions: ({navigation}) => ({
            title: 'Whats up Doc?',
            headerStyle: { backgroundColor:'rgb(28,135,206)'},
            headerTitleStyle: { color:'white'},
            headerRight: <SettingsButton navigation={navigation}/>,
            headerLeft: null
        })
    }
});

export const ChatStack = StackNavigator({
    Chat: {
        screen: Chat,
        navigationOptions: ({navigation}) => ({
            title: 'Chat',
            headerStyle: { backgroundColor:'rgb(28,135,206)'},
            headerTitleStyle: { color:'white'},
            headerRight: <SettingsButton navigation={navigation}/>
        })
    }
});

export const CreateEventStack = StackNavigator({
    CreateEvent: {
        screen: CreateEvent,
        navigationOptions:{
            title: 'New Event',
            headerStyle: { backgroundColor:'rgb(28,135,206)'},
            headerTitleStyle: { color:'white'},
        }
    },
    CreateEventTime: {
        screen: CreateEventTime,
            navigationOptions: {
                title: 'New Event',
                headerStyle: { backgroundColor:'rgb(28,135,206)'},
                headerTitleStyle: { color:'white'}
            }
    },
    CreateEventInvites: {
        screen: CreateEventInvites,
        navigationOptions: {
            title: 'New Event',
            headerStyle: { backgroundColor:'rgb(28,135,206)'},
            headerTitleStyle: { color:'white'}
        }
    }
    },
    {navigationOptions: ({navigation}) => ({
        headerLeft:null,
        headerRight: <CancelButton navigation={navigation}/>
    })
});

export const Tabs = TabNavigator({
    FriendsStack : {
        screen: FriendsStack,
        navigationOptions: {
            tabBarLabel: 'Friends',
            tabBarIcon: ({ tintColor }) => <Icon name='group' size={35} color={tintColor}/>
        }
    },
    EventsStack : {
        screen: EventsStack,
        navigationOptions: {
            tabBarLabel: 'Events',
            tabBarIcon: ({ tintColor }) => <Icon name='event-available' size={35} color={tintColor}/>
        }
    },
    ChatStack : {
        screen: ChatStack,
        navigationOptions: {
            tabBarLabel: 'Chat',
            tabBarIcon: ({ tintColor }) => <Icon name='message' size={35} color={tintColor}/>
        }
    }
});

export const Root = StackNavigator({
    Tabs: {
        screen: Tabs,
        navigationOptions: {
            header: null
        }
    },
    EventChat: {
        screen: EventChat,
        navigationOptions: {
            title: 'Message',
            headerStyle: { backgroundColor:'rgb(28,135,206)'},
            headerTitleStyle: { color:'white'},
            headerTintColor:'white'
        }
    },
    CreateEventStack: {
        screen: CreateEventStack,
        navigationOptions: {
           header: null
        }
    },
    AddFriend: {
        screen: AddFriend,
        navigationOptions: {
            //header: null
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: 'Settings'
        }
    }
});