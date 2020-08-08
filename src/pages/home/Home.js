import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, Image, TouchableOpacity, StatusBar, ScrollView, Dimensions } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import Bars from '../../assets/bars.png';
import Eye from '../../assets/eye.png';
import Sight from '../../assets/sight.png';
import UserMale from '../../assets/user-male.png';
import UserFemale from '../../assets/user-female.png';
import Button from '../../assets/button.png';

import PendenciesRevenue from '../../components/pendenciesRevenue';
import PendenciesExpenses from '../../components/pendenciesExpenses';
import Presentation from '../../assets/presentation.png';
import Chart from '../../components/chart/Chart';

export default function Login(props) {

    const navigation = useNavigation();

    const [totalRevenue, setTotalRevenue] = useState([]);
    const [totalExpense, setTotalExpense] = useState([]);
    const [sumTotal, setSumTotal] = useState('');
    const [gender, setGender] = useState('');
    const [hidden, setHidden] = useState(false);

    const id = auth().currentUser.uid;

    useEffect(() => {
        database().ref('finance_user')
            .child(id)
            .once('value')
            .then((snapshot) => {
                setGender(snapshot.val().gender);
            });
    }, [gender]);

    useEffect(() => {
        let n = 1;
        for (let i = n; i <= 4; i++) {
            let int = n++;
            database().ref('finance_wallet')
                .child(id)
                .child(int.toString())
                .child('finance_revenue')
                .once('value')
                .then((snapshot) => {
                    snapshot.forEach((item) => {
                        totalRevenue.push({
                            value: item.val().value,
                            toggle: item.val().toggle
                        });
                    });
                });
            database().ref('finance_wallet')
                .child(id)
                .child(int.toString())
                .child('finance_expense')
                .once('value')
                .then((snapshot) => {
                    snapshot.forEach((item) => {
                        totalExpense.push({
                            value: item.val().value,
                            toggle: item.val().toggle
                        });
                    });
                    const filterTotalRevenue = totalRevenue.map((val) => {
                        if (val.toggle == true) {
                            return parseFloat(val.value);
                        }
                    });
                    const filterTotalExpense = totalExpense.map((val) => {
                        if (val.toggle == true) {
                            return parseFloat(val.value);
                        }
                    });

                    let conc = filterTotalRevenue.concat(filterTotalExpense);
                    let indexRemove = undefined;
                    let index = conc.indexOf(indexRemove);

                    while (index >= 0) {
                        conc.splice(index, 1);
                        index = conc.indexOf(indexRemove);
                    }
                    let sumValue = conc.reduce((t, v) => t + v, 0);
                    setSumTotal(sumValue);
                });
        }
    }, []);

    function handleDrawer() {
        props.navigation.openDrawer();
    }

    function handleAddRevenue() {
        navigation.navigate('AddRevenue');
    }

    // const [cards, setCards] = useState([
    //     { key: '1', flag: Mastercard, nameCard: 'Nubank', closeDate: '12/jun', value: 250, valueTotal: 250 },
    // ]);

    function hiddenValue() {
        setHidden(!hidden);
    }

    function formatarMoeda() {
        var elemento = sumTotal;
        var valor = elemento.valueOf();
        
        valor = valor + '';
        valor = valor > 0 ? parseInt(valor.replace(/[\D]+/g,'')) : parseInt('-'+valor.replace(/[\D]+/g,''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");
        
        if (valor.length > 7) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        
        if(valor == 'NaN') {
            return '0,00';
        } else if(valor == 0) {
            return '0,00'
        } else {
            return valor;
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={{ height: Dimensions.get('screen').height }}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <View style={styles.header}>
                    <View style={styles.headerButtons}>
                        <TouchableHighlight underlayColor="transparent" onPress={handleDrawer}>
                            <Image source={Bars} style={styles.bars} />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => navigation.navigate('Profile')} underlayColor="transparent">
                            <Image source={gender === 'Feminino' ? UserFemale : UserMale} style={styles.users} />
                        </TouchableHighlight>
                    </View>
                    <Text style={styles.labelInfoMoney}>
                        Valor em contas:
                    </Text>
                    <View style={styles.infoMoney}>
                        <View style={{ flexDirection: 'row' }}>
                            {hidden === false &&
                                <Text style={styles.totalMoney}>
                                    {/* {Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(sumTotal)} */}
                                    R$ {formatarMoeda(sumTotal)}
                                </Text>
                            }

                            {hidden &&
                                <View style={styles.containerHidden}></View>
                            }

                            <TouchableHighlight onPress={hiddenValue} underlayColor="#transparent">
                                <Image source={hidden === true ? Sight : Eye} style={styles.hiddenMoney} />
                            </TouchableHighlight>
                        </View>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleAddRevenue}>
                            <Image source={Button} style={styles.addMoneyIcon} />
                            <Text style={styles.addMoneyText}>Dinheiro</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.infoActivity}>

                    <Text style={styles.labelinfoActivity}>Pendências</Text>
                    <ScrollView
                        style={styles.pendencies}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <PendenciesRevenue />
                        <PendenciesExpenses />
                        
                    </ScrollView>

                    {/* <Text style={styles.labelinfoActivity}>Cartões</Text>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <Cards data={item} />}
                        data={cards}
                    /> */}

                    <Text style={styles.labelinfoActivity}>Despesas por categoria</Text>
                    {totalExpense == '' &&
                        <View style={styles.containerMsg}>
                            <Image source={Presentation} style={styles.imageMsg} />
                            <Text style={{ textAlign: 'center' }}>Ops! Você ainda não tem gastos cadastrados. Adicione gastos e veja o gráfico</Text>
                        </View>
                    }
                    {totalExpense != '' &&
                        <View style={styles.containerChart}>
                            <Chart />
                        </View>
                        
                    }
                </View>
            </View>
        </ScrollView>
    );
}