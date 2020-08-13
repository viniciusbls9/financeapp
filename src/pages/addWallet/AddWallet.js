import React, { useState } from 'react';
import { View, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView, Alert, FlatList } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useNavigation, CommonActions } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { connect } from 'react-redux';

import styles, { Container, Header, BackButton, BackImage, TextHeader, FieldsWallet, Label, ContainerPicker, InputName, ContainerBtnSave, BtnSave, TextBtnSave, TextMessageError } from './styles';
import Arrow from '../../assets/arrows.png';

function AddWallet(props) {
    const navigation = useNavigation();
    let uid = auth().currentUser.uid;

    const [bankName, setBankName] = useState('');
    const [initial, setInitial] = useState('');
    const [typeAccount, setTypeAccount] = useState('0');
    const [accountName, setAccountName] = useState('');
    const [selectedBank, setSelectedBank] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const [existBank, setExistBank] = useState([]);
    const [existTypeAccount, setExistTypeAccount] = useState([]);

    const [bank, setBank] = useState([
        { key: '1', name: 'Nubank', initial: 'N', bgColor: '#8A17BE', active: false },
        { key: '2', name: 'Itaú', initial: 'I', bgColor: '#EC7001', active: false },
        { key: '3', name: 'Bradesco', initial: 'B', bgColor: '#FD352A', active: false },
        { key: '4', name: 'Santander', initial: 'S', bgColor: '#CC2900', active: false },
        { key: '5', name: 'Banco do Brasil', initial: 'BB', bgColor: '#F8D117', active: false },
        { key: '6', name: 'Caixa Econômica', initial: 'C', bgColor: '#185E9C', active: false },
    ]);

    // useState(() => {
    //     database().ref('finance_user').child(uid)
    //     .child(typeAccount)
    //     .once('value')
    //     .then((snapshot) => {
    //         setExistBank(snapshot.val().bank)
    //     });
    // }, []);

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

    function toggleWallet(key, index) {
        let newBank = [...bank];
        setBankName(newBank[index].name);
        setInitial(newBank[index].initial);
        setSelectedBank([key]);
    }

    return (
        <Container>
            <Header>
                <BackButton underlayColor="transparent" onPress={() => navigation.navigate('Wallet')}>
                    <>
                        <BackImage source={Arrow} />
                        <TextHeader>Carteira</TextHeader>
                    </>
                </BackButton>
            </Header>

            <FieldsWallet>
                <Label>Instituição Financeira</Label>
                <FlatList
                    horizontal={true}
                    data={bank}
                    renderItem={({ item, index }) =>
                        <TouchableHighlight
                            style={selectedBank.includes(item.key) ? styles.selectedBank : styles.typeBank}
                            onPress={() => toggleWallet(item.key, index)}
                            underlayColor="transparent">
                            <>
                                <View style={[styles.containerInitialBank, { backgroundColor: item.bgColor }]}>
                                    <Text style={styles.textInitialBank}>{item.name.substr(0, 1)}</Text>
                                </View>
                                <Text style={styles.nameBank}>{item.name}</Text>
                            </>
                        </TouchableHighlight>
                    }
                    keyExtractor={item => item.key}
                />

                <Label>Tipo de conta</Label>
                <ContainerPicker>
                    <Picker
                        selectedValue={typeAccount}
                        onValueChange={(itemValue) => setTypeAccount(itemValue)}
                        style={{color: props.theme.descCard}}
                    >
                        <Picker.Item key={0} label="Selecionar conta" value={''} />
                        <Picker.Item key={1} label="Conta corrente" value={'1'} />
                        <Picker.Item key={2} label="Poupança" value={'2'} />
                        <Picker.Item key={3} label="Investimento" value={'3'} />
                        <Picker.Item key={4} label="Outros" value={'4'} />
                    </Picker>
                </ContainerPicker>

                <Label>Nome da conta</Label>
                <InputName
                    value={accountName}
                    onChangeText={setAccountName}
                    returnKeyType="done"
                />

                <ContainerBtnSave>
                    <BtnSave
                        onPress={addWallet}
                        underlayColor='#ff3b47'
                        disabled={bank != '' && typeAccount != '' && bankName  != '' ? false : true}
                    >
                        <TextBtnSave>Salvar</TextBtnSave>
                    </BtnSave>
                    <TextMessageError>{errorMessage}</TextMessageError>
                </ContainerBtnSave>

            </FieldsWallet>

        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.userReducer.theme
    };
}

export default connect(mapStateToProps)(AddWallet);