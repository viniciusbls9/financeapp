import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

export default function ActivityHistory(props) {

    return (
        <View style={styles.containerCard}>

            <View style={styles.TextsCard}>
                <Image source={props.data.flag} style={styles.iconCard} />
                <Text style={styles.titleCard}>{props.data.nameCard}</Text>
                <Text style={styles.descCard}>Fecha em: {props.data.closeDate}</Text>
                <Text style={styles.valueCard}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(props.data.value)}
                </Text>
            </View>

            <View style={styles.containerTotal}>
                <Text style={styles.titleTotal}>Total</Text>
                <Text style={styles.valueTotal}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(props.data.valueTotal)}
                </Text>
            </View>

        </View>
    );
}