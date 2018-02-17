import React from 'react';
import { AsyncStorage } from 'react-native'

class LocalStorage {

    async setItem(key, payload){
        try {
            await AsyncStorage.setItem(key, payload);
        } catch (error) {
            // Error saving data
        }
    }
    
    async getItem(key){
        try {
            const value = await AsyncStorage.getItem(key);
        if (value !== null){            
            return value
        }
        } catch (error) {
            // Error retrieving data
        }
    }

    async removeItem(key){
        try {
            await AsyncStorage.removeItem(key)
            return true
        } catch (error) {
            // Error saving data
            return false
        }
    }
}

const localStorage = new LocalStorage();
export default localStorage;