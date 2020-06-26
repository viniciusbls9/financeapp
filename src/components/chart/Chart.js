import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import ColorExpense from '../colorsExpense/ColorExpense';

export default function Chart() {
    const id = auth().currentUser.uid;
    const [totalExpense, setTotalExpense] = useState([]);
    const [expense, setExpense] = useState([]);

    useEffect(() => {
        let n = 1;
        for(let i = n; i <= 4; i++) {
            let int = n++;
            database().ref('finance_wallet')
            .child(id)
            .child(int.toString())
            .child('finance_expense')
            .limitToLast(3)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach((item) => {
                    totalExpense.push({
                        category: item.val().category,
                        value: item.val().value,
                        color: item.val().color
                    });
                });
                const data = totalExpense.map((val) => {
                    return { name: val.category, value: parseFloat(val.value), color: val.color, legendFontColor: "#7F7F7F", legendFontSize: 15 }
                });
                setTotalExpense(data);
            });
        }
    }, []);

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

    return (
        <View>
            <PieChart
                data={totalExpense}
                width={Dimensions.get('window').width}
                height={150}
                chartConfig={chartConfig}
                accessor='value'
                backgroundColor="transparent"
                paddingLeft="-30"
                // absolute
            />
        </View>
    );
}