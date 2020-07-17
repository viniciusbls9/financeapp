import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { useNavigation, CommonActions } from '@react-navigation/native';
import styles from './styles';
import Arrow from '../../assets/arrows.png';
import Wallet from '../../assets/wallet.png';
import ListExpense from '../../components/listExpenses';
import MoreExpenses from '../../assets/more.png';
import ImageExpense from '../../assets/expense.jpg';

export default function Expenses() {

    const [totalExpense, setTotalExpense] = useState([]);
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        /** LOOP PARA RODAR 4 VEZES, QUE SÃO OS VALUES DE CADA CONTA ADICIONADA PELO USUÁRIO */
        let uid = auth().currentUser.uid;
        let n = 1;
        for(let i = n; i <= 4; i++) {
            let int = n++
            database().ref('finance_wallet')
            .child(uid)
            .child(int.toString())
            .child('finance_expense').once('value')
            .then((snapshot) => {
                snapshot.forEach((childItem) => {
                    activity.push({
                        category: childItem.val().category,
                        date: childItem.val().date,
                        description: childItem.val().description,
                        remember: childItem.val().remember,
                        tag: childItem.val().tag,
                        toggle: childItem.val().toggle,
                        value: childItem.val().value,
                        account: childItem.val().account,
                        key: childItem.key
                    });
                });
                let total = activity.reduce((t, v) => t + (parseFloat(v.value)), 0);
                setTotalExpense(total);
            });
        }
    }, [activity]);

    const navigation = useNavigation();

    function handleBack() {
        // navigation.dispatch(
        //     CommonActions.reset({
        //         index: 0,
        //         routes: [
        //             { name: 'Home'},
        //         ]
        //     }));
        navigation.navigate('Home');
    }

    function handleAddRevenue() {
        navigation.navigate('AddExpenses');
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableHighlight onPress={handleBack} underlayColor="transparent">
                    <Image source={Arrow} style={styles.backImage} />
                </TouchableHighlight>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleAddRevenue}>
                    <Image source={MoreExpenses} style={styles.iconMoreExpenses} />
                    <Text style={styles.textHeader}>Despesas</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerInfo}>
                <View style={styles.containerTotalExpenses}>
                    <Image source={Wallet} style={styles.walletImage} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.expensesTotalText}>Total Pago</Text>
                        <Text style={styles.expensesTotalValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(totalExpense)}
                        </Text>
                    </View>
                </View>

                {activity == '' &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 3 }}>
                        <Image source={ImageExpense} style={styles.img} />
                        <Text>Ops! Nenhuma despesa adicionada até o momento.</Text>
                    </View>
                }

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={activity}
                    renderItem={({ item }) => <ListExpense data={item} />}
                />
            </View>
        </View>
    );
}