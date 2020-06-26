import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import WalletImg from '../../assets/wallet-vector.png'

export default function Wallet() {
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

            <View style={{ alignItems: 'center', }}>
                <Image source={WalletImg} />
                <Text style={styles.info}>Em breve você poderá ver informações de suas carteiras!</Text>
            </View>

            {/* <Poupanca />
            <ContaCorrente />
            <Investimento />
            <Outros /> */}
        </View>
    );
}