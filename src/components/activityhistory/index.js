import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

export default function ActivityHistory(props) {

    return (
        <View style={styles.containerActivity}>
            <Image source={props.data.icon} style={styles.iconActivity} />

            <View style={styles.TextsActivity}>
                <Text style={styles.titleActivity}>{props.data.title}</Text>
                <Text style={styles.descActivity}>{props.data.date}</Text>
            </View>

            <Text style={[styles.valueActivity, { color: props.data.value > '0' ? '#27B635' : '#c2494d' }]}>
                {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(props.data.value)}
            </Text>
        </View>
    );
}