import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import UserWallet from '../../components/userWallet/UserWallet';
import styles from './styles';

export default function Wallet() {
    const navigation = useNavigation();
    const uid = auth().currentUser.uid;

    /** ARRAY QUE CONTEM INFORMAÇÕES DE RECEITA DAS CARTEIRAS */
    const [walletRevenue, setWalletRevenue] = useState([]);

    /** ARRAY QUE CONTEM INFORMAÇÕES DE RECEITA DAS CARTEIRAS */
    const [walletExpense, setWalletExpense] = useState([]);

    /** ARRAY QUE CONTEM NOME DOS BANKS */
    const [nameBank, setNameBank] = useState('');
    /** ARRAY QUE CONTEM AS INICIAIS DE CADA BANCO */
    const [initial, setInitial] = useState('');

    /** ARRAY QUE ARMAZENA OS VALORES DE GASTOS E RECEITAS */
    const [sumTotal, setSumTotal] = useState([]);

    const [teste, setTeste] = useState([]);

    
    let bg = initial;
    let color = '';

    switch (bg) {
        case 'N':
            color = '#8A17BE';
        break;
        case 'I':
            color = '#EC7001';
        break;
        case 'B':
            color = '#FD352A';
        break;
        case 'S':
            color = '#CC2900';
        break;
        case 'BB':
            color = '#F8D117';
        break;
        case 'C':
            color = '#185E9C';
        break;
    }

    useEffect(() => {
        database().ref('finance_wallet')
        .child(uid)
        .child('2')
        .child('finance_revenue')
        .once('value')
        .then((snapshot) => {
            snapshot.forEach(item => {
                walletRevenue.push({
                    bank: item.val().account,
                    value: item.val().value,
                    key: item.key,
                });
            });
        });
        database().ref('finance_wallet')
        .child(uid)
        .child('2')
        .child('finance_expense')
        .once('value')
        .then((snapshot) => {
            snapshot.forEach(item => {
                walletExpense.push({
                    bank: item.val().account,
                    value: item.val().value,
                    key: item.key,
                });
            });
            /** MAPEAR SOMENTE OS VALORES DE CADA CARTEIRA */
            let valRevenue = walletRevenue.map((val) => {
                return parseFloat(val.value);
            });
            let valExpense = walletExpense.map((val) => {
                return parseFloat(val.value);
            });
            let concValue = valRevenue.concat(valExpense);
            let sum = concValue.reduce((t, v) => t + v, 0);
            setTeste(sum);

            /** MAPEAR SOMENTE OS NOMES DE CADA CARTEIRA */
            let nameRevenue = walletRevenue.map((n) => {
                return n.bank;
            });
            let nameExpense = walletExpense.map((n) => {
                return n.bank;
            });
            let concName = nameRevenue.concat(nameExpense);
            var reduced = [];
            concName.forEach((item) => {
                var duplicated = reduced.findIndex(redItem => {
                    return item.name == redItem.name;
                }) > -1;

                if (!duplicated) {
                    reduced.push(item);
                }
            });

            /** MAPEAR SOMENTE AS CHAVES */
            let keyRevenue = walletRevenue.map((k) => {
                return k.key
            });
            let keyExpense = walletExpense.map((k) => {
                return k.key
            });
            let concKey = keyRevenue.concat(keyExpense);
            let obj = [{ value: sum, name: reduced, key: concKey }];
            setSumTotal(obj);
        });
    }, []);

    useEffect(() => {
        database().ref('finance_wallet')
        .child(uid)
        .child('2')
        .once('value')
        .then((snapshot) => {
            setInitial(snapshot.val() === null ? '' : snapshot.val().initial);
            setNameBank(snapshot.val() === null ? '' : snapshot.val().bank);
        });
    }, []);

    return (
        <View style={styles.container}>
            {nameBank != '' &&
                <FlatList
                    data={sumTotal}
                    renderItem={({ item }) => (
                        <View style={styles.containerActivity}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={[styles.containerInitialBank, { backgroundColor: color }]}>
                                    <Text style={{ color: '#fff' }}>{initial}</Text>
                                </View>
                                {/* <Text style={styles.walletName}>{props.data.name}</Text> */}
                            </View>
                            <View style={styles.TextsActivity}>
                                <Text style={{ color: item.value >= 0 ? '#27B635' : '#ff4f5a', fontSize: 18, fontWeight: 'bold' }}>
                                    {Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(item.value)}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            }
        </View>
    );
}