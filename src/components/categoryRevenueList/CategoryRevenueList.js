import React, { useState } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import Alert from '../../assets/alert.png';

export default function Expenses(props) {

    const navigation = useNavigation();

    return (
        <TouchableHighlight style={styles.container} underlayColor="#transparent">
            <>
                <View>
                    <Text>...</Text>
                </View>
            </>
        </TouchableHighlight>
    );
}