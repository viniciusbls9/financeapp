import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import TouchID from 'react-native-touch-id';

import styles from './styles';
import loginImage from '../../assets/home2.jpg';

export default function Welcome() {
    const navigation = useNavigation();    
    // const [supported, setSupported] = useState(null);

    function handleSignUp () {
        navigation.navigate('Register');
    }

    function handleSignIn () {
        navigation.navigate('Login');
    }
    // useEffect(() => {
    //     TouchID.isSupported().then(success => {
    //         setSupported(true);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }, []);

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

                {/* <TouchableOpacity style={styles.buttonSignIn} onPress={handleLogin}>
                    <Text style={styles.textBtnRegister}>Já sou cadastrado</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}