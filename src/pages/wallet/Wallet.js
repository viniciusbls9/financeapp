import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import UserWallet from '../../components/userWallet/UserWallet';
import styles from './styles';

export default function Wallet() {
    const navigation = useNavigation();

    const [wallet, setWallet] = useState([
        { key: '1', name: 'Conta Corrente Nubank', value: 10055.05 },
        { key: '2', name: 'Poupança', value: 10055.05 },
        { key: '3', name: 'Investimento', value: -15 },
    ]);

    const [width, setWidth] = useState(new Animated.Value(0));
    const [opacity, setOpacity] = useState(new Animated.Value(0));

    function handleAnimation() {
        Animated.sequence([
            Animated.timing(
                width,
                {
                    toValue: 150,
                    useNativeDriver: false
                }
            ),
            Animated.timing(
                opacity,
                {
                    toValue: 1,
                    useNativeDriver: false
                }
            )
        ]).start();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.textHeader}>Carteiras</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('AddWallet')}>
                    <Text style={styles.textHeader}>Nova Carteira</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.userWallet}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <UserWallet data={item} />}
                    data={wallet}
                />
            </View>
            <View>

                <TouchableOpacity onPress={handleAnimation}>
                    <Text>?</Text>
                </TouchableOpacity>

                <Animated.View style={{ width: width, backgroundColor: '#fff', padding: 10, opacity: opacity }}>
                    <Text style={{ textAlign: 'center', color: '#222', fontSize: 12 }}>Separe os centavos colocando ponto</Text>
                </Animated.View>
            </View>
        </View>
    );
}