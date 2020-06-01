import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


import Expenses from '../../assets/expenses-active.png';


export default function ActivityHistory(props) {

    const [pendenciesRevenue, setPendenciesRevenue] = useState([
        { key: '1', value: 1500 },
        { key: '2', value: 1000 },
        { key: '3', value: 1500 },
    ]);

    const v0 = pendenciesRevenue[0].value;
    const v1 = pendenciesRevenue[1].value;
    const v2 = pendenciesRevenue[2].value;

    const vtotal = v0 + v1 + v2

    const total = pendenciesRevenue.length

    return (
        <View style={styles.containerActivity}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={Expenses} style={styles.iconActivity} />
                <View style={styles.countPendenciesRevenue}>
                    <Text style={styles.valueActivity}>{total}</Text>
                </View>
            </View>

            <View style={styles.TextsActivity}>
                <Text style={styles.titleActivity}>Despesas pendentes</Text>
                <Text style={styles.descActivity}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(vtotal)}
                </Text>
            </View>
        </View>
    );
}