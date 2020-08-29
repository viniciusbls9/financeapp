import React from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import { Container, Header, TextHeader, Touchable } from './styles';

import ContaCorrente from '../../components/wallets/ContaCorrente';
import Investimento from '../../components/wallets/Investimento';
import Poupanca from '../../components/wallets/Poupança';
import Outros from '../../components/wallets/Outros';

export default function Wallet(props) {
    const navigation = useNavigation();
    const uid = auth().currentUser.uid;

    return (
        <Container>
            <Header>
                <Touchable onPress={() => navigation.navigate('Profile')}>
                    <TextHeader>Carteiras</TextHeader>
                </Touchable>

                <Touchable onPress={() => navigation.navigate('AddWallet')}>
                    <TextHeader>Nova carteira</TextHeader>
                </Touchable>
            </Header>

            <Poupanca />
            <ContaCorrente />
            <Investimento />
            <Outros />
        </Container>
    );
}