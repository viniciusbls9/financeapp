import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import styles from './styles';

import ContaCorrente from '../../components/wallets/ContaCorrente';
import Investimento from '../../components/wallets/Investimento';
import Poupanca from '../../components/wallets/Poupança';
import Outros from '../../components/wallets/Outros';

export default function Wallet(props) {
    const navigation = useNavigation();
    const uid = auth().currentUser.uid;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.textHeader}>Carteiras</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('AddWallet')}>
                    <Text style={styles.textHeader}>Nova Carteira</Text>
                </TouchableOpacity>
            </View>

            <Poupanca />
            <ContaCorrente />
            <Investimento />
            <Outros />
        </View>
    );
}