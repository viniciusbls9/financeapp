import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import RevenueIcon from '../iconRevenue';
import Alert from '../../assets/alert.png';

export default function Expenses(props) {

    let account = props.data.account;
    let translate = '';

    switch (account) {
        case '1':
            translate = 'Conta Corrente';
        break;
        case '2':
            translate = 'Poupança';
        break;
        case '3':
            translate = 'Investimento';
        break;
        case '4':
            translate = 'Outros';
        break;
    }

    const navigation = useNavigation();

    function handleEdit() {
        navigation.navigate('EditRevenue', {
            category: props.data.category,
            description: props.data.description,
            remember: props.data.remember,
            tag: props.data.tag,
            toggle: props.data.toggle,
            value: props.data.value,
            date: props.data.date,
            account:props.data.account,
            key: props.data.key
        });
    }

    let revenueRegister = props.data.date;
    let dateRevenue = new Date(revenueRegister);
    let dayDateRevenue = dateRevenue.getDate();
    let monthDateRevenue = dateRevenue.getMonth();
    let yearDateRevenue = dateRevenue.getFullYear().toString().substr(2,2);

    let rememberRevenue = props.data.remember
    let dateRemember = new Date(rememberRevenue).getDate();
    
    dayDateRevenue = dayDateRevenue < 10 ? '0' + dayDateRevenue : dayDateRevenue;
    monthDateRevenue = (monthDateRevenue + 1) < 10 ? '0' + (monthDateRevenue + 1) : (monthDateRevenue + 1);

    let dateRevenueRegisterFormated = dayDateRevenue + '/' + monthDateRevenue + '/' + yearDateRevenue;

    return (
        <TouchableHighlight style={styles.container} underlayColor="#transparent" onPress={handleEdit}>
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
                                <Text style={styles.dateRevenue}>{dateRevenueRegisterFormated} | </Text>
                                <Text style={styles.dateRevenue}>{translate}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.infoValueRevenue}>
                    <Text style={styles.valueRevenue}>
                        {props.data.value}
                    </Text>
                    {dateRemember == new Date(Date.now()).getDate() &&
                        <Text style={styles.dateRemember}>Dia de receber</Text>
                    }
                    {props.data.toggle === false &&
                        <Image source={Alert} style={styles.iconPay} />
                    }
                </View>
            </>
        </TouchableHighlight>
    );
}