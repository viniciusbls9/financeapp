import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Container, ContainerActivity, ContainerBank, ContainerInitialBank,TextInitialBank, TextValue } from './styles';

export default function ContaCorrente(props) {
    const uid = auth().currentUser.uid;

    /** ARRAY QUE CONTEM INFORMAÇÕES DE RECEITA DAS CARTEIRAS */
    const [walletRevenue, setWalletRevenue] = useState([]);

    /** ARRAY QUE CONTEM INFORMAÇÕES DE RECEITA DAS CARTEIRAS */
    const [walletExpense, setWalletExpense] = useState([]);

    /** ARRAY QUE CONTEM NOME DOS BANKS */
    const [nameBank, setNameBank] = useState('');
    /** ARRAY QUE CONTEM AS INICIAIS DE CADA BANCO */
    const [initial, setInitial] = useState('');

    /** ARRAY QUE ARMAZENA OS VALORES DE GASTOS E RECEITAS */
    const [sumTotal, setSumTotal] = useState([]);
    const [value, setValue] = useState([]);

    let bg = initial;
    let bgColor = '';

    switch (bg) {
        case 'N':
            bgColor = "#8A17BE";
            break;
        case 'I':
            bgColor = "#EC7001";
            break;
        case 'B':
            bgColor = "#FD352A";
            break;
        case 'S':
            bgColor = "#CC2900";
            break;
        case 'BB':
            bgColor = "#F8D117";
            break;
        case 'C':
            bgColor = "#185E9C";
            break;
    }

    useEffect(() => {
        database().ref('finance_wallet')
            .child(uid)
            .child('3')
            .child('finance_revenue')
            .once('value')
            .then((snapshot) => {
                snapshot.forEach(item => {
                    walletRevenue.push({
                        bank: item.val().account,
                        value: item.val().value,
                        key: item.key,
                    });
                });
            });
        database().ref('finance_wallet')
            .child(uid)
            .child('3')
            .child('finance_expense')
            .once('value')
            .then((snapshot) => {
                snapshot.forEach(item => {
                    walletExpense.push({
                        bank: item.val().account,
                        value: item.val().value,
                        key: item.key,
                    });
                });
                /** MAPEAR SOMENTE OS VALORES DE CADA CARTEIRA */
                let valRevenue = walletRevenue.map((val) => {
                    return parseFloat(val.value);
                });
                let valExpense = walletExpense.map((val) => {
                    return parseFloat(val.value);
                });
                let concValue = valRevenue.concat(valExpense);
                let sum = concValue.reduce((t, v) => t + v, 0);
                // console.log(sum);

                /** MAPEAR SOMENTE OS NOMES DE CADA CARTEIRA */
                let nameRevenue = walletRevenue.map((n) => {
                    return n.bank;
                });
                let nameExpense = walletExpense.map((n) => {
                    return n.bank;
                });
                let concName = nameRevenue.concat(nameExpense);
                var reduced = [];
                concName.forEach((item) => {
                    var duplicated = reduced.findIndex(redItem => {
                        return item.name == redItem.name;
                    }) > -1;

                    if (!duplicated) {
                        reduced.push(item);
                    }
                });

                /** MAPEAR SOMENTE AS CHAVES */
                let keyRevenue = walletRevenue.map((k) => {
                    return k.key
                });
                let keyExpense = walletExpense.map((k) => {
                    return k.key
                });
                let concKey = keyRevenue.concat(keyExpense);
                let obj = [{ value: sum, name: reduced, key: concKey }];
                setSumTotal(obj);
                setValue(sum);
            });
    }, []);

    useEffect(() => {
        database().ref('finance_wallet')
            .child(uid)
            .child('3')
            .once('value')
            .then((snapshot) => {
                setInitial(snapshot.val() === null ? '' : snapshot.val().initial);
                setNameBank(snapshot.val() === null ? '' : snapshot.val().bank);
            });
    }, []);

    function formatarMoeda() {
        var elemento = value;
        var valor = elemento.valueOf();

        valor = valor + '';
        valor = valor > 0 ? parseInt(valor.replace(/[\D]+/g, '')) : parseInt('-' + valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");

        if (parseInt(valor) < 0 && valor.length > 7) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        } else if(parseInt(valor) > 0 && valor.length > 6) {
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
            {nameBank != '' &&
                <FlatList
                    data={sumTotal}
                    renderItem={({ item }) => (
                        <ContainerActivity>
                            <ContainerBank>
                                <ContainerInitialBank bgInitial={bgColor}>
                                    <TextInitialBank>
                                        {initial}
                                    </TextInitialBank>
                                </ContainerInitialBank>
                            </ContainerBank>
                            <TextValue color={item.value >= 0 ? '#27B635' : '#ff4f5a'}>
                                R$ {formatarMoeda(item.value)}
                            </TextValue>
                        </ContainerActivity>
                    )}
                />
            }
        </Container>
    );
}