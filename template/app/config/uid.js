import React from 'react';
import { AsyncStorage } from 'react-native';

export async function getUID() {
    var myKey = ''
    try {
        myKey = await AsyncStorage.getItem('@MySuperStore:key');
    } catch (error) {
        // Error retrieving data
    }
    return myKey
}