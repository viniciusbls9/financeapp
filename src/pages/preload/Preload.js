import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import TouchID from 'react-native-touch-id';

import styles from './styles';

export default function Welcome() {
    const navigation = useNavigation();
    const [supported, setSupported] = useState(null);

    useEffect(() => {
        TouchID.isSupported().then(success => {
            setSupported(true);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    // function handleLogin() {
    //     const configs = {
    //         title: 'Autenticação Touch ID',
    //         color: '#ff0000',
    //         sensorErrorDescription: 'Touch ID invalido',
    //     };
    //     TouchID.authenticate('Login Financeapp', configs)
    //     .then(success => {
    //         navigation.navigate('Home');
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // }

    AsyncStorage.getItem('@password').then(password => {
        if (password) {
            const configs = {
                title: 'Autenticação Touch ID',
                color: '#ff0000',
                sensorErrorDescription: 'Touch ID invalido',
            };
            TouchID.authenticate('Login Financeapp', configs)
            .then(success => {
                navigation.navigate('Home');
            })
            .catch(error => {
                console.log(error);
            });
            // navigation.navigate('Home');
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