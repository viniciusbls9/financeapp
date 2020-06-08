import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { useNavigation, CommonActions } from '@react-navigation/native';
import styles from './styles';
import Arrow from '../../assets/arrows.png';
import Wallet from '../../assets/wallet.png';
import ListRevenue from '../../components/listRevenue';
import MoreExpenses from '../../assets/more.png';

export default function AddExpenses() {
    
    const [activity, setActivity] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState([]);

    useEffect(() => {
        let uid = auth().currentUser.uid
        database().ref('finance_revenue')
        .child(uid)
        .once('value')
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
                    key: childItem.key
                });
            });
            let total = activity.reduce((t, v) => t + (parseFloat(v.value)), 0);
            setTotalRevenue(total);
        });
    }, []);
    
    const navigation = useNavigation();

    function handleBack() {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Home'},
                ]
            }));
    }

    function handleAddRevenue() {
        navigation.navigate('AddRevenue');
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
                    <Text style={styles.textHeader}>Receitas</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerInfo}>
                <View style={styles.containerTotalExpenses}>
                    <Image source={Wallet} style={styles.walletImage} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.expensesTotalText}>Total Recebido</Text>
                        <Text style={styles.expensesTotalValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(totalRevenue)}
                        </Text>
                    </View>
                </View>

                {activity == '' &&
                    <View  style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Ops! Nenhuma receita adicionada até o momento</Text>
                    </View>
                }

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={activity}
                    renderItem={({ item }) => <ListRevenue data={item} />}
                />
            </View>
        </View>
    );
}