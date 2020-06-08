import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, Image, TouchableOpacity, FlatList, StatusBar, ScrollView } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import Bars from '../../assets/bars.png';
import Users from '../../assets/users.png';
import Button from '../../assets/button.png';
import Food from '../../assets/food.png';
import Pig from '../../assets/pig.png';
import Mastercard from '../../assets/mastercard.png';

import PendenciesRevenue from '../../components/pendenciesRevenue';
import PendenciesExpenses from '../../components/pendenciesExpenses';
import Cards from '../../components/cards';

export default function Login(props) {

    const navigation = useNavigation();

    const [totalRevenue, setTotalRevenue] = useState([]);
    const [totalExpense, setTotalExpense] = useState([]);
    const [sumTotal, setSumTotal] = useState([]);
    

    const id = auth().currentUser.uid;

    useEffect(() => {
        database().ref('finance_revenue')
            .child(id)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((item) => {
                    totalRevenue.push({
                        value: item.val().value,
                        toggle: item.val().toggle
                    });
                });
            });
        database().ref('finance_expense')
            .child(id)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((item) => {
                    totalExpense.push({
                        value: item.val().value,
                        toggle: item.val().toggle
                    });
                });
                const filterTotalRevenue = totalRevenue.map((val) => {
                    if (val.toggle == true) {
                        return parseFloat(val.value);
                    }
                });
                const filterTotalExpense = totalExpense.map((val) => {
                    if (val.toggle == true) {
                        return parseFloat('-' + val.value);
                    }
                });

                let conc = filterTotalRevenue.concat(filterTotalExpense);
                let indexRemove = undefined;
                let index = conc.indexOf(indexRemove);

                while (index >= 0) {
                    conc.splice(index, 1);
                    index = conc.indexOf(indexRemove);
                }
                let sumValue = conc.reduce((t, v) => t + v);
                setSumTotal(sumValue);
            });
    }, []);

    async function handleLogout() {
        await AsyncStorage.clear();

        props.navigation.navigate('Welcome');
    }

    function handleDrawer() {
        props.navigation.openDrawer();
    }

    function handleAddRevenue() {
        navigation.navigate('AddRevenue');
    }

    const [cards, setCards] = useState([
        { key: '1', flag: Mastercard, nameCard: 'Nubank', closeDate: '12/jun', value: 250, valueTotal: 250 },
    ]);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <View style={styles.header}>
                    <View style={styles.headerButtons}>
                        <TouchableHighlight underlayColor="transparent" onPress={handleDrawer}>
                            <Image source={Bars} style={styles.bars} />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => navigation.navigate('Profile')} underlayColor="transparent">
                            <Image source={Users} style={styles.users} />
                        </TouchableHighlight>
                    </View>
                    <Text style={styles.labelInfoMoney}>Receita em conta:</Text>
                    <View style={styles.infoMoney}>
                        <Text style={styles.totalMoney}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(sumTotal)}
                        </Text>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleAddRevenue}>
                            <Image source={Button} style={styles.addMoneyIcon} />
                            <Text style={styles.addMoneyText}>Dinheiro</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.infoActivity}>

                    <Text style={styles.labelinfoActivity}>Pendências</Text>
                    <ScrollView
                        style={styles.pendencies}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <PendenciesRevenue />
                        <PendenciesExpenses />
                    </ScrollView>


                    <Text style={styles.labelinfoActivity}>Cartões de crédito</Text>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <Cards data={item} />}
                        data={cards}

                    />
                </View>
                {/* <View style={{margin:20}}>
                    <Text style={styles.labelinfoActivity}>Historico de atividade</Text>
                    <ActivityHistory />
                </View> */}
                {/* <View style={{ flexDirection: 'row' }}>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <ActivityHistory data={item} />}
                            data={activity}
                        />
                    </View> */}
            </View>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}