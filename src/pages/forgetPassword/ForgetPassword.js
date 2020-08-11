import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import firebase from '@react-native-firebase/app';

import styles from './styles';

export default function Login() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function forgetPassword() {
        var auth = firebase.auth();
        var emailAddress = email;

        auth.sendPasswordResetEmail(emailAddress).then(function () {
            setMessage('O e-mail para redefinição de senha foi enviado!')
            setEmail('');
        }).catch(function (error) {
            setMessage('Ocorreu um problema com o envio de e-mail. Tente novamente mais tarde.')
        });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : ''}
            style={styles.container}
        >
            <View>
                <View style={styles.containerInput}>
                    <TextInput
                        placeholder="E-mail para recuperação"
                        autoCapitalize="none"
                        placeholderTextColor="#aaa"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />

                    {message != '' &&
                        <View style={styles.message}>
                            <Text>{message}</Text>
                        </View>
                    }
                    <TouchableOpacity style={styles.submitBtn} onPress={forgetPassword}>
                        <Text style={styles.textBtnSubmit}>Recuperar senha</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </KeyboardAvoidingView>
    );
}