import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
// import database from '@react-native-firebase/database';
// import auth from '@react-native-firebase/auth';

import Wallet from '../../assets/wallet.png';

export default function PendencesRevenue(props) {

    return (
        <View style={styles.containerActivity}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={Wallet} style={styles.iconActivity} />
                <Text style={styles.walletName}>{props.data.bank}</Text>
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