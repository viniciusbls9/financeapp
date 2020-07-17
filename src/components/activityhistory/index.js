import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import styles from './styles';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import RevenueIcon from '../iconRevenue';


export default function ActivityHistory(props) {
    const id = auth().currentUser.uid;
    const [activityHistoryExpense, setActivityHistoryExpense] = useState([]);
    const [activityHistoryRevenue, setActivityHistoryRevenue] = useState([]);

    useEffect(() => {
        database().ref('finance_expense')
            .child(id)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((item) => {
                    activityHistoryExpense.push({
                        category: item.val().category,
                        date: item.val().date,
                        description: item.val().description,
                        tag: item.val().tag,
                        toggle: item.val().toggle,
                        value: item.val().value,
                        key: item.val().key
                    });
                });
            });
    }, [activityHistoryExpense]);

    return (
        <View style={styles.containerActivity}>
            {activityHistoryRevenue.map(item => {
                return (
                    <View style={styles.containerInfo} key={item.key}>
                        <View style={{backgroundColor: item.value > 0 ? '#27B635' : '#ff4f5a'}}>
                            <Image source={RevenueIcon(item.tag)} style={styles.iconActivity} />
                        </View>
                        <View style={styles.TextsActivity}>
                            <Text style={styles.titleActivity}>{item.description}</Text>
                            <Text style={styles.descActivity}>{item.date}</Text>
                        </View>
                    </View>


                )
            })}
        </View>
    );
}