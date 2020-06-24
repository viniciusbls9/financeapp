import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import Sistema from '../../Sistema'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Picker } from '@react-native-community/picker';

import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Login() {

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [load, setLoad] = useState(false);

    // Sistema.logout();

    async function handleRegister() {
        try {
            setLoad(true);
            if (name != '' && email != '' && password != '' && gender != '') {
                await Sistema.registerConfirme(email, password);
                await database().ref('finance_user').child(auth().currentUser.uid).set({
                    userName: name,
                    gender: gender
                });
                navigation.navigate('Home');
            } else {
                setErrorMessage('Preencha todos os campos para efetivar o cadastro');
                setLoad(false);
            }
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setErrorMessage('E-mail já cadastrado no aplicativo');
                    break;
                case 'auth/invalid-email':
                    setErrorMessage('É obrigatório inserir um e-mail válido');
                    break;
                case 'auth/weak-password':
                    setErrorMessage('Sua senha deve ter ao menos 6 digitos');
                    break;
            }
            setLoad(false);
        }
    }

    const handleBack = () => {
        navigation.navigate('Login');
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled={Platform.OS == 'ios'}
        >
            <View style={styles.containerInput}>
                <TextInput
                    placeholder="Nome"
                    autoCapitalize="words"
                    placeholderTextColor="#aaa"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <TextInput
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Senha"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />
                <Picker
                    style={styles.picker}
                    selectedValue={gender}
                    onValueChange={(itemValue) => setGender(itemValue)}
                    value={setGender}
                    mode="dropdown"
                >
                    <Picker.Item key={0} value={'Feminino'} label={'Feminino'} />
                    <Picker.Item key={1} value={'Masculino'} label={'Masculino'} />
                </Picker>

                {errorMessage != '' &&
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                }
                {load &&
                    <ActivityIndicator size="large" color="#5c8efe" style={{ marginBottom: 20 }} />
                }

                <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
                    <Text style={styles.textBtnSubmit}>Registrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerBtn} onPress={handleBack}>
                    <Text>Já tem cadastro?
                        <Text style={styles.textBtnRegister}> Fazer Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}