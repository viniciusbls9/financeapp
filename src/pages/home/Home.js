import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableHighlight, Image, TouchableOpacity, StatusBar, ScrollView, Dimensions, RefreshControl } from 'react-native';

import { useNavigation, CommonActions } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import BarsIcon from '../../assets/bars.png';
import EyeGrey from '../../assets/eye-grey.png';
import Sight from '../../assets/sight.png';
import UserMale from '../../assets/user-male.png';
import UserFemale from '../../assets/user-female.png';
import Button from '../../assets/button.png';

import { connect } from 'react-redux';

import PendenciesRevenue from '../../components/pendenciesRevenue';
import PendenciesExpenses from '../../components/pendenciesExpenses';
import Presentation from '../../assets/presentation.png';
import PresentationGrey from '../../assets/presentation-grey.png';
import Chart from '../../components/chart/Chart';

import { Container, ContainerInfo, Header, HeaderBtn, HeaderButtons, Bars, Users, LabelInfoMoney, ValueMoney, TotalMoney, ContainerHidden, HiddenValue, HiddenMoney, InfoMoney, ContainerAddMoney, AddIcon, AddMoneyText, InfoActivity, LabelinfoActivity, Pendencies, ContainerMsg, ImageMsg, TextMsg, ContainerChart, LoveMsg } from './styles';

function Home(props) {

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
        valor = valor > 0 ? parseInt(valor.replace(/[\D]+/g, '')) : parseInt('-' + valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");

        if (parseInt(valor) < 0 && valor.length > 7) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        } else if (parseInt(valor) > 0 && valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }

        let st = '-,'

        if (valor == 'NaN') {
            return '0,00';
        } else if (valor == 0) {
            return '0,00'
        } else if (valor.includes('-,')) {
            return '-' + valor.replace('-', 0);
        } else {
            return valor;
        }
    }

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        navigation.dispatch(
            CommonActions.reset({
                routes: [
                    { name: 'Home' },
                ]
            }));

        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <Container
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <ContainerInfo>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Header>
                    <HeaderButtons>
                        <HeaderBtn underlayColor="transparent" onPress={() => props.navigation.openDrawer()}>
                            <Bars source={BarsIcon} />
                        </HeaderBtn>
                        <HeaderBtn onPress={() => navigation.navigate('Profile')} underlayColor="transparent">
                            <Users source={gender === 'Feminino' ? UserFemale : UserMale} />
                        </HeaderBtn>
                    </HeaderButtons>

                    <LabelInfoMoney>
                        Valor em contas:
                    </LabelInfoMoney>

                    <InfoMoney>
                        <ValueMoney>
                            {hidden === false &&
                                <TotalMoney>
                                    R$ {formatarMoeda(sumTotal)}
                                </TotalMoney>
                            }

                            {hidden &&
                                <ContainerHidden></ContainerHidden>
                            }

                            <HiddenValue onPress={hiddenValue} underlayColor="#transparent">
                                <HiddenMoney source={hidden === true ? Sight : EyeGrey} />
                            </HiddenValue>
                        </ValueMoney>
                        <ContainerAddMoney onPress={() => navigation.navigate('AddRevenue')} underlayColor="#transparent">
                            <>
                                <AddIcon source={Button} />
                                <AddMoneyText>Dinheiro</AddMoneyText>
                            </>
                        </ContainerAddMoney>
                    </InfoMoney>
                </Header>

                <InfoActivity>
                    <LabelinfoActivity>Pendências</LabelinfoActivity>
                    <Pendencies
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <PendenciesRevenue />
                        <PendenciesExpenses />
                    </Pendencies>

                    <LabelinfoActivity>Despesas por categoria</LabelinfoActivity>
                    {totalExpense == '' &&
                        <ContainerMsg>
                            <ImageMsg source={props.theme.title == 'light' ? Presentation: PresentationGrey} />
                            <TextMsg>Ops! Você ainda não tem gastos cadastrados. Adicione gastos e veja o gráfico</TextMsg>
                        </ContainerMsg>
                    }
                    {totalExpense != '' &&
                        <ContainerChart>
                            <Chart />
                        </ContainerChart>

                    }

                </InfoActivity>

            </ContainerInfo>
                <LoveMsg>Feito com ❤️</LoveMsg>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.userReducer.theme
    };
}

export default connect(mapStateToProps)(Home);