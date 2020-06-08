import React, { useState } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import RevenueIcon from '../iconRevenue';
import Alert from '../../assets/alert.png';

export default function Expenses(props) {

    const navigation = useNavigation();

    function handleEdit() {
        navigation.navigate('EditExpense', {
            category: props.data.category,
            description: props.data.description,
            tag: props.data.tag,
            toggle: props.data.toggle,
            value: props.data.value,
            key: props.data.key
        });
    }
    let rememberExpense = props.data.remember
    let dateRemember = new Date(rememberExpense).getDate();

    let revenueRegister = props.data.date;
    let dateRevenue = new Date(revenueRegister);
    let dayDateRevenue = dateRevenue.getDate();
    let monthDateRevenue = dateRevenue.getMonth();
    let yearDateRevenue = dateRevenue.getFullYear();


    dayDateRevenue = dayDateRevenue < 10 ? '0' + dayDateRevenue : dayDateRevenue;
    monthDateRevenue = (monthDateRevenue + 1) < 10 ? '0' + (monthDateRevenue + 1) : (monthDateRevenue + 1);

    let dateRevenueRegisterFormated = dayDateRevenue + '/' + monthDateRevenue + '/' + yearDateRevenue

    return (
        <TouchableHighlight style={styles.container} underlayColor="transparent" onPress={handleEdit}>
            <>
                <View style={styles.infoRevenue}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.containerIcon}>
                            <Image source={RevenueIcon(props.data.tag)} style={styles.iconRevenue} />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.descRevenue} numberOfLines={1} ellipsizeMode="tail">{props.data.description}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.catRevenue}>{props.data.category} | </Text>
                                <Text style={styles.dateRevenue}>{dateRevenueRegisterFormated}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.infoValueRevenue}>
                    <Text style={styles.valueRevenue}>
                        {Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            maximumFractionDigits: 4
                        }).format(props.data.value)}
                    </Text>
                    {dateRemember == new Date(Date.now()).getDate() &&
                        <Text style={styles.dateRemember}>Dia de pagar</Text>
                    }
                    {props.data.toggle === false &&
                        <Image source={Alert} style={styles.iconPay} />
                    }
                </View>
            </>
        </TouchableHighlight>
    );
}