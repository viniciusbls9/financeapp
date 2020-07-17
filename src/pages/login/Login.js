import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Sistema from '../../Sistema';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import Logo from '../../assets/logo.png';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [load, setLoad] = useState(false);

    async function handleSubmit()  {
        try {
            setLoad(true);
            if(email != '' && password != '') {
                await Sistema.login(email, password);
                await AsyncStorage.setItem('@email', email);
                await AsyncStorage.setItem('@password', password);
                navigation.navigate('Home');
            } else {
                setErrorMessage('Preencha todos os campos para efetivar o login');
            }
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    setErrorMessage('Ops, senha inválida!');
                break;
                case 'auth/user-not-found':
                   setErrorMessage('Ops, usuário inválido!');
                break;
            }
        }
    }

    const handleRegister = () => {
        navigation.navigate('Register');
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled={Platform.OS == 'ios'}
        >
            <View style={styles.header}>
                <Image source={Logo} style={styles.logo} />
            </View>

            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.containerInput}>
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Senha"
                    autoCapitalize="none"
                    placeholderTextColor="#aaa"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    style={styles.input}
                />

                {errorMessage != '' &&
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                }

                {load &&
                    <ActivityIndicator size="large" color="#5c8efe" style={{ marginBottom: 20 }} />
                }
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    <Text style={styles.textBtnSubmit}>Entrar</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
                    <Text>Novo por aqui?
                        <Text style={styles.textBtnRegister}> Cadastrar</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}