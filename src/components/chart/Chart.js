import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function Chart() {
    const id = auth().currentUser.uid;
    const [totalExpense, setTotalExpense] = useState([]);
    const [expense, setExpense] = useState([]);

    useEffect(() => {
        database().ref('finance_expense')
            .child(id)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((item) => {
                    totalExpense.push({
                        category: item.val().category,
                        value: item.val().value,
                        toggle: item.val().toggle
                    });
                });
                const data = totalExpense.map((val) => {
                    return { name: val.category, value: val.value }
                });
                setTotalExpense(data);
            });
    }, []);

    const chartConfig = {
        backgroundGradientFrom: "#0f0000",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#000",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(20, 255, 146, ${opacity})`,
        strokeWidth: 5, // optional, default 3
        barPercentage: 0.6,
        useShadowColorFromDataset: false // optional
    };

    const dt = [
        {
            name: "Alimentação",
            value: 1110,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },

    ];

    return (
        <View>

            <PieChart
                data={totalExpense}
                width={Dimensions.get('window').width}
                height={150}
                chartConfig={chartConfig}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="-35"
                absolute
            />

            {/* <Text>{JSON.stringify(totalExpense)}</Text> */}
        </View>
    );
}