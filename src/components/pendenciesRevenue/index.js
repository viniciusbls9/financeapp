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
        let n = 1;
        for(let i = n; i <= 4; i++) {
            let int = n++;
            database().ref('finance_wallet')
            .child(id)
            .child(int.toString())
            .child('finance_revenue')
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
                let sumPendenceRevenue = filterPendenceRevenue.reduce((t, v) => t + v, 0);
                setPendenciesRevenue(sumPendenceRevenue);
            });
        }
    }, []);

    function formatarMoeda() {
        var elemento = pendenciesRevenue;
        var valor = elemento.valueOf();
        
        valor = valor + '';
        valor = valor > 0 ? parseInt(valor.replace(/[\D]+/g,'')) : parseInt('-'+valor.replace(/[\D]+/g,''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");
        
        if (valor.length > 6) {
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

                <Image source={Revenue} style={styles.iconActivity} />
                <View style={styles.countPendenciesRevenue}>
                    <Text style={styles.valueActivity}>{count}</Text>
                </View>
            </View>

            <View style={styles.TextsActivity}>
                <Text style={styles.titleActivity}>Receitas pendentes</Text>
                <Text style={styles.descActivity}>
                    R$ {formatarMoeda(pendenciesRevenue)}
                </Text>
            </View>

        </View>
    );
}