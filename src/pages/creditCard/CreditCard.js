import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Wrapper, Title, Image } from './styles';
import firebase from '@react-native-firebase/app';

import CreditCard from '../../assets/credit-card-image.jpg';

export default function Cards() {

    return (
        <Wrapper>
            <Image source={CreditCard} />
            <Title>
                Em breve novas funcionalidades para controle de faturas de cartão de crédito.
            </Title>
        </Wrapper>
    );
}