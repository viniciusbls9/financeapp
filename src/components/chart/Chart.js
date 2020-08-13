import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { connect } from 'react-redux';


function Chart(props) {
    const id = auth().currentUser.uid;
    const [totalExpense, setTotalExpense] = useState([]);

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
                    return { name: val.category, value: parseFloat(val.value), color: val.color, legendFontColor: props.theme.titlePendencies, legendFontSize: 13 }
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
                width={320}
                height={120}
                chartConfig={chartConfig}
                accessor='value'
                backgroundColor="transparent"
                paddingLeft="-30"
            />
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.userReducer.theme
    };
}

export default connect(mapStateToProps)(Chart);