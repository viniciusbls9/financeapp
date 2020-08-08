import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { useNavigation, CommonActions } from '@react-navigation/native';
import styles from './styles';
import Arrow from '../../assets/arrows.png';
import Wallet from '../../assets/wallet.png';
import ListRevenue from '../../components/listRevenue';
import MoreExpenses from '../../assets/more.png';
import ImageRevenue from '../../assets/image-revenue.jpg';
export default function Revenue() {

    const [activity, setActivity] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState([]);

    useEffect(() => {
        /** LOOP PARA RODAR 4 VEZES, QUE SÃO OS VALUES DE CADA CONTA ADICIONADA PELO USUÁRIO */
        let uid = auth().currentUser.uid;
        let n = 1;
        for(let i = n; i <= 4; i++) {
            let int = n++
            database().ref('finance_wallet')
            .child(uid)
            .child(int.toString())
            .child('finance_revenue')
            .once('value')
            .then((snapshot) => {
                snapshot.forEach(childItem => {
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
                setTotalRevenue(total);
            });
        }
    }, []);

    const navigation = useNavigation();

    function handleBack() {
        // navigation.dispatch(
        //     CommonActions.reset({
        //         index: 0,
        //         routes: [
        //             { name: 'Home' },
        //         ]
        //     }));
        navigation.navigate('Home');
    }

    function handleAddRevenue() {
        navigation.navigate('AddRevenue');
    }

    function formatarMoeda() {
        var elemento = totalRevenue;
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
                        <Text style={styles.revenueTotalText}>Total Recebido</Text>
                        <Text style={styles.revenueTotalValue}>
                            R$ {formatarMoeda(totalRevenue)}
                        </Text>
                    </View>
                </View>

                {activity == '' &&
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 3 }}>
                        <Image source={ImageRevenue} style={styles.img} />
                        <Text>Ops! Nenhuma receita adicionada até o momento.</Text>
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