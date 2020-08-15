import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { Container, Header, BackButton, BackImage, ContainerAddRevenue, IconMoreExpenses, TextHeader, ContainerInfo, ContainerTotalExpenses, WalletImage, ContainerValueExpense, ExpensesTotalText, ExpenseTotalValue, ContainerImage, Img, TextImg } from './styles';
import Arrow from '../../assets/arrows.png';
import Wallet from '../../assets/wallet.png';
import WalletWhite from '../../assets/money-white.png';
import ListExpense from '../../components/listExpenses';
import MoreExpenses from '../../assets/more.png';
import ImageExpense from '../../assets/image-expense.jpg';

function Expenses(props) {

    const [totalExpense, setTotalExpense] = useState([]);
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        /** LOOP PARA RODAR 4 VEZES, QUE SÃO OS VALUES DE CADA CONTA ADICIONADA PELO USUÁRIO */
        let uid = auth().currentUser.uid;
        let n = 1;
        for (let i = n; i <= 4; i++) {
            let int = n++
            database().ref('finance_wallet')
                .child(uid)
                .child(int.toString())
                .child('finance_expense').once('value')
                .then((snapshot) => {
                    snapshot.forEach((childItem) => {
                        activity.push({
                            category: childItem.val().category,
                            date: childItem.val().date,
                            description: childItem.val().description,
                            remember: childItem.val().remember,
                            tag: childItem.val().tag,
                            toggle: childItem.val().toggle,
                            value: childItem.val().value,
                            account: childItem.val().account,
                            key: childItem.key
                        });
                    });
                    let total = activity.reduce((t, v) => t + (parseFloat(v.value)), 0);
                    setTotalExpense(total);
                });
        }
    }, [activity]);

    const navigation = useNavigation();

    function formatarMoeda() {
        var elemento = totalExpense;
        var valor = elemento.valueOf();

        valor = valor + '';
        valor = valor > 0 ? parseInt(valor.replace(/[\D]+/g, '')) : parseInt('-' + valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");

        if (valor.length > 7) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }

        if (valor == 'NaN') {
            return '0,00';
        } else if (valor == 0) {
            return '0,00'
        } else {
            return valor;
        }
    }

    return (
        <Container>
            <StatusBar barStyle="dark-content" />
            <Header>
                <BackButton underlayColor="#transparent" onPress={() => navigation.navigate('Home')}>
                    <BackImage source={Arrow} />
                </BackButton>
                <ContainerAddRevenue underlayColor="#transparent" onPress={() => navigation.navigate('AddExpenses')}>
                    <>
                        <IconMoreExpenses source={MoreExpenses} />
                        <TextHeader>Despesas</TextHeader>
                    </>
                </ContainerAddRevenue>
            </Header>

            <ContainerInfo>
                <ContainerTotalExpenses>
                    <WalletImage source={props.theme.title == 'light' ? Wallet : WalletWhite} />
                    <ContainerValueExpense>
                        <ExpensesTotalText>Total pago</ExpensesTotalText>
                        <ExpenseTotalValue>R$ {formatarMoeda(totalExpense)}</ExpenseTotalValue>
                    </ContainerValueExpense>
                </ContainerTotalExpenses>

                {activity == '' &&
                    <ContainerImage>
                        <Img source={ImageExpense} />
                        <TextImg>Ops! Nenhuma despesa adicionada até o momento.</TextImg>
                    </ContainerImage>
                }

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={activity}
                    renderItem={({ item }) => <ListExpense data={item} />}
                />
            </ContainerInfo>

        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.userReducer.theme
    };
}

export default connect(mapStateToProps)(Expenses);