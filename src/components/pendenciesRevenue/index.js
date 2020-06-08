import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import Revenue from '../../assets/revenue-active.png';

export default function PendencesRevenue(props) {
    const id = auth().currentUser.uid;

    const [pendenciesRevenue, setPendenciesRevenue] = useState([]);
    const [count, setCount] = useState('');

    /**
     * Fetches information on added recipes to see which ones are pending
     */
    useEffect(() => {
        database().ref('finance_revenue')
            .child(id)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((item) => {
                    pendenciesRevenue.push({
                        value: item.val().value,
                        toggle: item.val().toggle
                    });
                });
                /**
                 * Filters all recipes registered in the user's account to return
                 */
                const filterPendenceRevenue = pendenciesRevenue.map((val) => {
                    if(val.toggle != true) {
                        return parseFloat(val.value);
                    }
                });
                /**
                 * Filters all undefined items found in the pending recipe array
                 */
                let indexRemove = undefined;
                let index = filterPendenceRevenue.indexOf(indexRemove);
                
                while(index >= 0) {
                    filterPendenceRevenue.splice(index, 1);
                    index = filterPendenceRevenue.indexOf(indexRemove);
                }
                setCount(filterPendenceRevenue.length);
                if(filterPendenceRevenue.length == 0) {
                    setPendenciesRevenue('0');
                }
                let sumPendenceRevenue = filterPendenceRevenue.reduce((t, v) => t + v);
                setPendenciesRevenue(sumPendenceRevenue);
            });
    }, []);

    return (
        <View style={styles.containerActivity}>
            <View style={{ flexDirection: 'row' }}>

                <Image source={Revenue} style={styles.iconActivity} />
                <View style={styles.countPendenciesRevenue}>
                    <Text style={styles.valueActivity}>{count}</Text>
                </View>
            </View>

            <View style={styles.TextsActivity}>
                <Text style={styles.titleActivity}>Receitas pendentes</Text>
                <Text style={styles.descActivity}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(pendenciesRevenue)}
                </Text>
            </View>

        </View>
    );
}