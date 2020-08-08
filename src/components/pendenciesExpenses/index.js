import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import Expense from '../../assets/expenses-active.png';

export default function PendenceExpense(props) {
    const id = auth().currentUser.uid;

    const [pendenciesExpense, setPendenciesExpense] = useState([]);
    const [count, setCount] = useState('');

    /**
     * Fetches information on added expense to see which ones are pending
     */
    useEffect(() => {
        let n = 1;
        for(let i = n; i <= 4; i++) {
            let int = n++;
            database().ref('finance_wallet')
            .child(id)
            .child(int.toString())
            .child('finance_expense')
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((item) => {
                    pendenciesExpense.push({
                        value: item.val().value,
                        toggle: item.val().toggle
                    });
                });
                /**
                 * Filters all recipes registered in the user's account to return
                 */
                const filterPendenceExpense = pendenciesExpense.map((val) => {
                    if (val.toggle != true) {
                        return parseFloat(val.value);
                    }
                });
                /**
                 * Filters all undefined items found in the expense recipe array
                 */
                let indexRemove = undefined;
                let index = filterPendenceExpense.indexOf(indexRemove);

                while (index >= 0) {
                    filterPendenceExpense.splice(index, 1);
                    index = filterPendenceExpense.indexOf(indexRemove);
                }

                setCount(filterPendenceExpense.length);
                if (filterPendenceExpense.length == 0) {
                    setPendenciesExpense('0');
                }
                let sumPendenceExpense = filterPendenceExpense.reduce((t, v) => t + v, 0);
                setPendenciesExpense(sumPendenceExpense);

            });
        }
    }, []);

    function formatarMoeda() {
        var elemento = pendenciesExpense;
        var valor = elemento.valueOf();
        
        valor = valor + '';
        valor = valor > 0 ? parseInt(valor.replace(/[\D]+/g,'')) : parseInt('-'+valor.replace(/[\D]+/g,''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");
        
        if (valor.length > 7) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        
        if(valor == 'NaN') {
            return '0,00';
        } else if(valor == 0) {
            return '0,00'
        } else {
            return valor;
        }
    }

    return (
        <View style={styles.containerActivity}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={Expense} style={styles.iconActivity} />
                <View style={styles.countPendenciesRevenue}>
                    <Text style={styles.valueActivity}>{count}</Text>
                </View>
            </View>

            <View style={styles.TextsActivity}>
                <Text style={styles.titleActivity}>Receitas pendentes</Text>
                <Text style={styles.descActivity}>
                    R$ {formatarMoeda(pendenciesExpense)}
                </Text>
            </View>
        </View>
    );
}