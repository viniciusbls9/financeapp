import React, { useState } from 'react';
import { View, Text, Image, TouchableHighlight, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useNavigation, CommonActions } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import Arrow from '../../assets/arrows.png';

export default function AddWallet() {
    const navigation = useNavigation();
    let uid = auth().currentUser.uid;

    const [bank, setBank] = useState([
        { key: '1', name: 'Nubank', initial: 'N', bgColor: '#8A17BE', active: false },
        { key: '2', name: 'Itaú', initial: 'I', bgColor: '#EC7001', active: false  },
        { key: '3', name: 'Bradesco', initial: 'B', bgColor: '#FD352A', active: false },
        { key: '4', name: 'Santander', initial: 'S', bgColor: '#CC2900', active: false },
        { key: '5', name: 'Banco do Brasil', initial: 'BB', bgColor: '#F8D117', active: false },
        { key: '6', name: 'Caixa Econômica', initial: 'C', bgColor: '#185E9C', active: false },
    ]);
    const [bankName, setBankName] = useState('');
    const [initial, setInitial] = useState('');
    const [typeAccount, setTypeAccount] = useState('Selecione...');
    const [accountName, setAccountName] = useState('');

    function addWallet() {
        let wallet = database().ref('finance_wallet').child(uid).child(typeAccount);
        if (bankName != '' && typeAccount != '' && accountName != '') {
            wallet.set({
                bank: bankName,
                typeAccount: typeAccount,
                accountName: accountName,
                initial: initial,
                date: new Date(Date.now()).getTime()
            });
            database().ref('finance_user').child(uid).child(typeAccount).set({
                typeAccount: typeAccount,
                bank: bankName
            });
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'Wallet' },
                    ]
                }));
        }
    }

    function toggleWallet(index) {
        let newBank = [...bank];
        setBankName(newBank[index].name);
        setInitial(newBank[index].initial);
    }

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={180} style={styles.container}>
            <View style={styles.header}>
                <TouchableHighlight underlayColor="transparent" style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('Wallet')}>
                    <>
                        <Image source={Arrow} style={styles.backImage} />
                        <Text style={styles.textHeader}>Nova Carteira</Text>
                    </>
                </TouchableHighlight>
            </View>

            <View style={styles.fieldsWallet}>
                <Text style={styles.label}>Instituição Financeira</Text>
                <FlatList
                    horizontal={true}
                    data={bank}
                    renderItem={({ item, index }) =>
                        <TouchableHighlight style={styles.typeBank} onPress={() => toggleWallet(index)} underlayColor="transparent">
                            <>
                                <View style={[styles.containerInitialBank, { backgroundColor: item.bgColor }]}>
                                    <Text style={styles.textInitialBank}>{item.name.substr(0,1)}</Text>
                                </View>
                                <Text style={styles.nameBank}>{item.name}</Text>
                            </>
                        </TouchableHighlight>
                    }
                    keyExtractor={item => item.key}
                />

                <Text style={styles.label}>Tipo de conta</Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={typeAccount}
                        onValueChange={(itemValue) => setTypeAccount(itemValue)}
                    >
                        <Picker.Item key={0} label="Conta corrente" value={'1'} />
                        <Picker.Item key={1} label="Poupança" value={'2'} />
                        <Picker.Item key={2} label="Investimento" value={'3'} />
                        <Picker.Item key={3} label="Outros" value={'4'} />
                    </Picker>
                </View>

                <Text style={styles.label}>Nome da conta</Text>
                <TextInput
                    style={styles.input}
                    value={accountName}
                    onChangeText={setAccountName}
                    returnKeyType="done"
                />

                <View style={styles.containerbtnSave}>
                    <TouchableHighlight onPress={addWallet} style={styles.btnSave} underlayColor="#transparent">
                        <Text style={styles.textBtnSave}>Salvar</Text>
                    </TouchableHighlight>
                    {/* <Text style={styles.textMessageError}>{messageError}</Text> */}
                </View>

            </View>

        </KeyboardAvoidingView>
    );
}
