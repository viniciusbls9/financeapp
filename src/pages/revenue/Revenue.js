import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import Arrow from '../../assets/arrows.png';
import Wallet from '../../assets/wallet.png';
import ListRevenue from '../../components/listRevenue';
import MoreRevenue from '../../assets/more.png';
import ImageRevenue from '../../assets/image-revenue.jpg';
import WalletWhite from '../../assets/money-white.png';

import { Container, Header, BackButton, BackImage, ContainerAddRevenue, IconMoreRevenue, TextHeader, ContainerInfo, ContainerTotalRevenue, WalletImage, ContainerValueExpense, RevenueTotalText, ExpenseTotalValue, ContainerImage, Img, TextImg } from './styles';

function Revenue(props) {

    const [activity, setActivity] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState([]);

    useEffect(() => {
        /** LOOP PARA RODAR 4 VEZES, QUE SÃO OS VALUES DE CADA CONTA ADICIONADA PELO USUÁRIO */
        let uid = auth().currentUser.uid;
        let n = 1;
        for (let i = n; i <= 4; i++) {
            let int = n++
            database().ref('finance_wallet')
                .child(uid)
                .child(int.toString())
                .child('finance_revenue')
                .once('value')
                .then((snapshot) => {
                    snapshot.forEach(childItem => {
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
                    setTotalRevenue(total);
                });
        }
    }, []);

    const navigation = useNavigation();

    function formatarMoeda() {
        var elemento = totalRevenue;
        var valor = elemento.valueOf();

        valor = valor + '';
        valor = valor > 0 ? parseInt(valor.replace(/[\D]+/g, '')) : parseInt('-' + valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");

        if (valor.length > 6) {
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
                <ContainerAddRevenue underlayColor="#transparent" onPress={() => navigation.navigate('AddRevenue')}>
                    <>
                        <IconMoreRevenue source={MoreRevenue} />
                        <TextHeader>Receitas</TextHeader>
                    </>
                </ContainerAddRevenue>
            </Header>

            <ContainerInfo>
                <ContainerTotalRevenue>
                    <WalletImage source={props.theme.title == 'light' ? Wallet : WalletWhite} />
                    <ContainerValueExpense>
                        <RevenueTotalText>Total recebido</RevenueTotalText>
                        <ExpenseTotalValue>R$ {formatarMoeda(totalRevenue)}</ExpenseTotalValue>
                    </ContainerValueExpense>
                </ContainerTotalRevenue>

                {activity == '' && props.theme.title == 'light' &&
                    <ContainerImage>
                        <Img source={ImageRevenue} />
                        <TextImg>Ops! Nenhuma receita adicionada até o momento.</TextImg>
                    </ContainerImage>
                }

                {activity == '' && props.theme.title != 'light' &&
                    <ContainerImage>
                        <TextImg>Ops! Nenhuma receita adicionada até o momento.</TextImg>
                    </ContainerImage>
                }

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={activity}
                    renderItem={({ item }) => <ListRevenue data={item} />}
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

export default connect(mapStateToProps)(Revenue);