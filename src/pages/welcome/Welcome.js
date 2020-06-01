import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import styles from './styles';
import loginImage from '../../assets/home2.jpg';

export default function Welcome() {
    const navigation = useNavigation();

    function handleSignUp () {
        navigation.navigate('Register');
    }

    function handleSignIn () {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={styles.containerText}>
                <Text style={styles.titleRegister}>Transforme suas finanças hoje mesmo</Text>
            </View>
            <View style={styles.containerImage}>
                <Image source={loginImage} style={styles.imagePreload} />
            </View>
            <Text style={styles.descText}>Nós queremos te ajudar nessa sua nova jornada. Gerencie suas finanças e chegue a tão sonhada liberdade financeira.</Text>
            <View style={styles.containerButtons}>
                <TouchableOpacity style={styles.buttonSignUp} onPress={handleSignUp}>
                    <Text style={styles.textBtnSignUp}>Começar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSignIn} onPress={handleSignIn}>
                    <Text style={styles.textBtnRegister}>Já sou cadastrado</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}