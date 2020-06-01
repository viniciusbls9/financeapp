import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';


import styles from './styles';

export default function Welcome() {
    const navigation = useNavigation();

    AsyncStorage.getItem('@password').then(password => {
        if (password) {
            navigation.navigate('Home');
        } else {
            navigation.navigate('Welcome');
        }
    });

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#ff4f5a" style={{ marginBottom: 20 }} style={styles.load} />
            <Text>Carregando dados...</Text>
        </View>
    );
}