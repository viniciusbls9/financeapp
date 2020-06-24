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

    const [walletRevenue, setWalletRevenue] = useState([]);
    const [total, setTotal] = useState([]);
    const [walletExpense, setWalletExpense] = useState([]);

    useEffect(() => {
        // let n = 1;
        // for(let i = n; i <= 4; i++) {
        //     let int = n++;
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
                /** MAPEAR SOMENTE OS VALORES DE CADA CARTEIRA */
                let fill = walletRevenue.map((val) => {
                    return parseFloat(val.value);
                });
                /** SOMAR TODOS OS VALORES INCLUIDOS NA CARTEIRA */
                let red = fill.reduce((v1, v2) => v1 + v2);
                setTotal(red);
            });
            // database().ref('finance_wallet')
            // .child(uid)
            // .child(int.toString())
            // .child('finance_expense')
            // .once('value')
            // .then((snapshot) => {
            //     snapshot.forEach(item => {
            //         walletExpense.push({
            //             accountName: item.val().account,
            //             value: item.val().value
            //         });
            //     });
            //     console.log(walletExpense);
            // });
        // }
    }, []);
    
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
            {/* <View style={styles.userWallet}> */}
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <UserWallet data={item} total={total} />}
                    data={walletRevenue}
                />
            {/* </View> */}
        </View>
    );
}