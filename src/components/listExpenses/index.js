import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, InfoRevenue, ContainerData, ContainerIcon, IconRevenue, ContainerInfo, DescRevenue, ContainerTexts, CatRevenue, DateRevenue, InfoValueRevenue, ValueRevenue, DateRemember, IconPay } from './styles';
import RevenueIcon from '../iconRevenue';
import Alert from '../../assets/alert.png';

export default function Expenses(props) {

    let account = props.data.account;
    let translate = '';

    switch (account) {
        case '1':
            translate = 'Conta Corrente';
            break;
        case '2':
            translate = 'Poupança';
            break;
        case '3':
            translate = 'Investimento';
            break;
        case '4':
            translate = 'Outros';
            break;
    }

    function formatarMoeda() {
        var elemento = props.data.value;
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

    const navigation = useNavigation();

    function handleEdit() {
        navigation.navigate('EditExpense', {
            category: props.data.category,
            description: props.data.description,
            remember: props.data.remember,
            tag: props.data.tag,
            toggle: props.data.toggle,
            value: props.data.value,
            date: props.data.date,
            account: props.data.account,
            key: props.data.key
        });
    }
    let rememberExpense = props.data.remember;
    let dateRemember = new Date(rememberExpense).getDate();

    let revenueRegister = props.data.date;
    let dateRevenue = new Date(revenueRegister);
    let dayDateRevenue = dateRevenue.getDate();
    let monthDateRevenue = dateRevenue.getMonth();
    let yearDateRevenue = dateRevenue.getFullYear().toString().substr(2, 2);


    dayDateRevenue = dayDateRevenue < 10 ? '0' + dayDateRevenue : dayDateRevenue;
    monthDateRevenue = (monthDateRevenue + 1) < 10 ? '0' + (monthDateRevenue + 1) : (monthDateRevenue + 1);

    let dateRevenueRegisterFormated = dayDateRevenue + '/' + monthDateRevenue + '/' + yearDateRevenue;

    return (
        <Container onPress={handleEdit}>
            <>
                {/* <InfoRevenue> */}
                    <ContainerData>

                        <ContainerIcon>
                            <IconRevenue source={RevenueIcon(props.data.tag)} />
                        </ContainerIcon>

                        <ContainerInfo>
                            <DescRevenue numberOfLines={1} ellipsizeMode="tail">
                                {props.data.description}
                            </DescRevenue>
                            <ContainerTexts>
                                <CatRevenue>{props.data.category} | </CatRevenue>
                                <DateRevenue>{dateRevenueRegisterFormated} | </DateRevenue>
                                <DateRevenue>{translate}</DateRevenue>
                            </ContainerTexts>
                        </ContainerInfo>

                    </ContainerData>
                {/* </InfoRevenue> */}

                <InfoValueRevenue>
                    <ValueRevenue>
                        {formatarMoeda(props.data.value)}
                    </ValueRevenue>
                    {dateRemember == new Date(Date.now()).getDate() &&
                        <DateRemember>Dia de pagar</DateRemember>
                    }
                    {props.data.toggle === false &&
                        <IconPay source={Alert} />
                    }
                </InfoValueRevenue>
            </>
        </Container>
    );
}