import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
// import database from '@react-native-firebase/database';
// import auth from '@react-native-firebase/auth';

export default function PendencesRevenue(props) {

    let bg = props.nameBank;
    let color = '';

    switch (bg) {
        case 'Nubank':
            color = '#8A17BE';
        break;
        case 'Itaú':
            color = '#EC7001';
        break;
        case 'Bradesco':
            color = '#FD352A';
        break;
        case 'Santander':
            color = '#CC2900';
        break;
        case 'Banco do Brasil':
            color = '#F8D117';
        break;
        case 'Caixa Econômica':
            color = '#185E9C';
        break;
    }

    return (
        <View style={styles.containerActivity}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.containerInitialBank, { backgroundColor: color}]}>
                    <Text style={{color: '#fff'}}>{props.initial}</Text>
                </View>
                <Text style={styles.walletName}>{props.nameBank}</Text>
            </View>
            <View style={styles.TextsActivity}>
                <Text style={{ color: props.data.value >= 0 ? '#27B635' : '#ff4f5a', fontSize: 18, fontWeight: 'bold' }}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(props.total)}
                </Text>
            </View>
        </View>
    );
}