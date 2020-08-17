import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, StatusBar, TextInput, Switch, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';

import { connect } from 'react-redux';

import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { Container, Header, BackExpense, BackImage, TextHeader, DeleteExpense, ContainerInputValue, TextFormValue, LabelFormValue, InputValue, ContainerInputs, ContainerSwitch, LabelSwitch, LabelInputs, InputDesc, ContainerPicker, ContainerCalendar, BtnCalendar, CalendarImage, BtnTextCalendar, ContainerBtnSave, BtnSave, TextBtnSave, TextMessageError, Modal, ModalBox, ModalBody, InputNewCategory, BtnNewCategory, BtnCancel, TextBtnCancel } from './styles';
import Arrow from '../../assets/arrows.png';
import Trash from '../../assets/trash.png';
import Calendar from '../../assets/calendar.png';
import ColorExpense from '../../components/colorsExpense/ColorExpense';

function EditExpense(props) {
    const navigation = useNavigation();
    const route = useRoute();

    /** CONSTANT FOR USER CHOOSE THE DATE */
    const [date, setDate] = useState(new Date(Date.now()).getTime());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [remember, setRemember] = useState(new Date(Date.now()).getTime());
    const [showRemember, setShowRemember] = useState(false);

    /**CONSTANT FOR OPEN MODAL */
    const [modalVisible, setModalVisible] = useState(false);

    /**CONSTANT FOR ADD NEW CATEGORY */
    const [newCategory, setNewCategory] = useState('');
    const [getNewCategory, setGetNewCategory] = useState([]);
    const [messageError, setMessageError] = useState('');


    /** DATETIMEPICKER FOR RECEIPT DATE */
    const onChangeDate = (event, selectedDate) => {
        const currentDate = new Date(selectedDate).getTime() || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setEditToogle(currentDate < new Date(Date.now()) ? true : false);
    };
    const showModeDate = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepickerDate = () => {
        showModeDate('date');
    };

    /** DATETIMEPICKER FOR REMEMBER DATE */
    const onChangeRemember = (event, selectedRemeber) => {
        const currentRemember = new Date(selectedRemeber).getTime() || remember;
        setShowRemember(Platform.OS === 'ios');
        setRemember(currentRemember);
    };
    const showModeRemember = currentMode => {
        setShowRemember(true);
        setMode(currentMode);
    };
    const showDatepickerRemember = () => {
        showModeRemember('date');
    };

    const [editCategory, setEditCategory] = useState(route.params.category);
    const [editDescription, setEditDescription] = useState(route.params.description);
    const [editToggle, setEditToogle] = useState(route.params.toggle);
    const [editValue, setEditValue] = useState(route.params.value);
    const [editRemember, setEditRemember] = useState(route.params.remember);
    const [editDate, setEditDate] = useState(route.params.date);
    const [account, setAccount] = useState(route.params.account);
    // const [sumPaid, setSumPaid] = useState([]);
    // const [sumUnpaid, setSumUnpaid] = useState([]);
    // const [count, setCount] = useState(1);

    /**CONSTANT TO RECEIVE VALUES ​​FROM THE BANK REGARDING THE ACCOUNTS CREATED BY THE USER  */
    const [getAccount, setGetAccouunt] = useState([]);

    const key = route.params.key;
    const uid = auth().currentUser.uid;

    function deleteExpense() {
        let sumExpensePaid = database().ref('finance_wallet').child(uid).child('finance_sum_expense_paid');
        let sumExpenseUnpaid = database().ref('finance_wallet').child(uid).child('finance_sum_expense_unpaid');
        Alert.alert(
            'Atenção',
            'Deseja realmente excluir?',
            [
                {
                    text: 'Sim',
                    onPress: () => {
                        database().ref('finance_wallet').child(uid).child(account).child('finance_expense').child(key).remove();
                        // sumExpensePaid.set(sumPaid != null ? parseInt(editValue) - parseInt(sumPaid) : null);
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    // { name: 'Home'},
                                    { name: 'Expenses' },
                                ]
                            }));
                    },
                    style: 'cancel',
                },
                {
                    text: 'Cancelar',
                    onPress: () => { }
                },
            ],
            { cancelable: false },
        );
    }

    function formatarMoeda() {
        var elemento = editValue;
        var valor = elemento.valueOf();

        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");
        // console.log(valor);

        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }

        if (valor == 'NaN') {
            return false;
        } else {
            return '-' + valor;
        }
    }

    // useEffect(() => {
    //     database().ref('finance_wallet').child(uid).child('finance_sum_expense_paid')
    //     .once("value")
    //     .then((snapshot) => {
    //         setSumPaid(snapshot.val());
    //     });
    // }, []);

    // useEffect(() => {
    //     database().ref('finance_wallet').child(uid).child('finance_sum_expense_unpaid')
    //     .once("value")
    //     .then((snapshot) => {
    //         setSumUnpaid(snapshot.val());
    //     });
    // }, []);

    function editExpense() {
        //INFORMAÇÕES DO USUÁRIO
        let newEditExpense = database().ref('finance_wallet').child(uid).child(account).child('finance_expense').child(key);

        // let sumExpensePaid = database().ref('finance_wallet').child(uid).child('finance_sum_expense_paid');
        // let sumExpenseUnpaid = database().ref('finance_wallet').child(uid).child('finance_sum_expense_unpaid');

        if (editValue != '' && editDescription != '' && editCategory != 'Selecione sua carteira') {
            // CADASTRO DA RECEITA
            newEditExpense.set({
                value: editValue.replace(',', ''),
                toggle: editToggle,
                description: editDescription,
                category: editCategory,
                tag: editCategory,
                date: date,
                remember: remember > new Date(Date.now()).getDate() ? remember : '',
                account: account,
                color: ColorExpense(editCategory),
            });

            // if(editValue != '' && editDescription != '' && editCategory != '' && editToggle === true) {
            //     sumExpensePaid.set(sumPaid != null ? parseInt(editValue) + parseInt(sumPaid) : editValue);
            //     if(parseInt(editValue) - parseInt(sumUnpaid) === 0) {
            //         sumExpenseUnpaid.remove();
            //     } else {
            //         sumExpenseUnpaid.set(sumUnpaid != null ? Math.abs(parseInt(editValue)) + (parseInt(sumUnpaid)) : editValue);
            //     }
            // } else if(editValue != '' && editDescription != '' && editCategory != '' && editToggle === false) {
            //     sumExpenseUnpaid.set(sumUnpaid != null ? parseInt(editValue) + parseInt(sumUnpaid) : editValue);
            //     if(parseInt(editValue) - parseInt(sumPaid) === 0) {
            //         sumExpensePaid.remove();
            //     } else {
            //         sumExpensePaid.set(sumPaid != null ? Math.abs(parseInt(editValue)) + (parseInt(sumPaid)) : editValue);
            //     }
            // }

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'Expenses' },
                    ]
                }));
        } else {
            setMessageError('Preencha todos os campos');
        }
    }

    /** RECOVERING INFORMATION IN THE BANK RELATING TO USER'S REVENUE CATEGORIES */
    useEffect(() => {
        database().ref('finance_expense_category')
            .child(uid)
            .on('value', snapshot => {
                snapshot.forEach((item) => {
                    getNewCategory.push({
                        category: item.val().category,
                        key: item.key
                    });
                });
                let mapCategory = getNewCategory.map((item, k) => {
                    return <Picker.Item key={k.key} value={item.category} label={item.category} />
                });
                setGetNewCategory(mapCategory);
            });
    }, []);

    /** RECOVERING INFORMATION IN THE BANK RELATING TO USER ACCOUNTS */
    useEffect(() => {
        database().ref('finance_user')
            .child(uid)
            .once('value')
            .then((snapshot) => {
                snapshot.forEach(item => {
                    getAccount.push({
                        typeAccount: item.val().typeAccount,
                        bankName: item.val().bank
                    });
                });
                let mapAccount = getAccount.map((item) => {
                    if (item.typeAccount != undefined) {
                        return <Picker.Item key={item.typeAccount} value={item.typeAccount} label={item.bankName} />
                    }
                });
                setGetAccouunt(mapAccount);
            });
    }, []);

    function openModal() {
        setModalVisible(true);
    }

    function addNewCategory() {
        let cat = database().ref('finance_expense_category').child(uid);

        if (newCategory != '') {
            // CADASTRO DA RECEITA
            let key = cat.push().key;
            cat.child(key).set({
                category: newCategory,
                date: Date.now(),
            });
            setNewCategory('');
            setModalVisible(false);
        } else {
            setMessageError('Preencha todos os campos');
        }
    }

    return (
        <Container>
            <Header>
                <BackExpense onPress={() => navigation.navigate('Expenses')} underlayColor="#transparent">
                    <>
                        <BackImage source={Arrow} />
                        <TextHeader>Despesas</TextHeader>
                    </>
                </BackExpense>
                <DeleteExpense underlayColor="transparent" onPress={deleteExpense}>
                    <BackImage source={Trash} />
                </DeleteExpense>
            </Header>

            <ContainerInputValue>
                <TextFormValue>
                    <LabelFormValue>Valor da despesa</LabelFormValue>
                </TextFormValue>
                <InputValue
                    placeholder=" R$ 00,00"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    autoFocus={true}
                    value={formatarMoeda(editValue)}
                    onChangeText={setEditValue}
                />
            </ContainerInputValue>

            <ContainerInputs>
                <ContainerSwitch>
                    <LabelSwitch>Pago</LabelSwitch>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff4f5a" }}
                        thumbColor={editToggle ? "#ff4f5a" : "#ff4f5a"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={setEditToogle}
                        value={editToggle}
                    />
                </ContainerSwitch>

                <LabelInputs>Descrição</LabelInputs>
                <InputDesc
                    value={editDescription}
                    onChangeText={setEditDescription}
                />

                <ContainerPicker>
                    <LabelInputs>Categoria</LabelInputs>
                    <Picker
                        selectedValue={editCategory}
                        onValueChange={(itemValue, itemIndex) => {
                            if (itemValue == 'Nova categoria') {
                                openModal(itemValue);
                            } else {
                                setEditCategory(itemValue);
                            }
                        }}
                        style={{ color: props.theme.descCard }}
                        value={setEditCategory}
                        mode="dropdown"
                    >
                        <Picker.Item key={0} value={'Selecione sua carteira'} label={'Selecione sua categoria'} />
                        <Picker.Item key={1} value={'Alimentação'} label={'Alimentação'} />
                        <Picker.Item key={2} value={'Educação'} label={'Educação'} />
                        <Picker.Item key={3} value={'Lazer'} label={'Lazer'} />
                        <Picker.Item key={4} value={'Moradia'} label={'Moradia'} />
                        <Picker.Item key={5} value={'Pagamentos'} label={'Pagamentos'} />
                        <Picker.Item key={6} value={'Roupas'} label={'Roupas'} />
                        <Picker.Item key={7} value={'Saúde'} label={'Saúde'} />
                        <Picker.Item key={8} value={'Transporte'} label={'Transporte'} />
                        <Picker.Item key={9} value={'Outros'} label={'Outros'} />
                        {getNewCategory}
                        <Picker.Item key={10} value={'Nova categoria'} label={'Nova categoria'} />

                    </Picker>
                </ContainerPicker>

                <ContainerPicker>
                    <LabelInputs>Carteira</LabelInputs>
                    <Picker
                        selectedValue={account}
                        onValueChange={(itemValue) => {
                            if (itemValue == 'Adicionar conta') {
                                navigation.navigate('AddWallet');
                            } else {
                                setAccount(itemValue);
                            }
                        }}
                        style={{ color: props.theme.descCard }}
                        value={setAccount}
                        mode="dropdown"
                    >
                        <Picker.Item key={0} value={''} label={'Selecione sua carteira'} />
                        {getAccount}
                        <Picker.Item key={0} value={'Adicionar conta'} label={'Adicionar conta'} />
                    </Picker>
                </ContainerPicker>

                <ContainerCalendar>
                    <LabelInputs>Data de pagamento</LabelInputs>
                    <BtnCalendar onPress={showDatepickerDate} underlayColor="#ff3b47">
                        <>
                            <CalendarImage source={Calendar} />
                            <BtnTextCalendar>Selecionar data</BtnTextCalendar>
                        </>
                    </BtnCalendar>
                </ContainerCalendar>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                    />
                )}

                <ContainerCalendar>
                    <LabelInputs>Lembrar-me</LabelInputs>
                    <BtnCalendar onPress={showDatepickerRemember} underlayColor="#ff3b47">
                        <>
                            <CalendarImage source={Calendar} />
                            <BtnTextCalendar>Selecionar data</BtnTextCalendar>
                        </>
                    </BtnCalendar>
                </ContainerCalendar>
                {showRemember && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={editRemember == '' ? Date.now() : editRemember}
                        mode={'datetime'}
                        is24Hour={true}
                        display="default"
                        minimumDate={new Date(Date.now()).getTime()}
                        onChange={onChangeRemember}
                    />
                )}

                <ContainerBtnSave>
                    <BtnSave onPress={editExpense} underlayColor="#ff3b47">
                        <TextBtnSave>Salvar</TextBtnSave>
                    </BtnSave>
                    <TextMessageError>{messageError}</TextMessageError>
                </ContainerBtnSave>

                <Modal
                    visible={modalVisible}
                    animationType="fade"
                    transparent={true}
                >
                    <ModalBox>
                        <ModalBody>
                            <InputNewCategory
                                placeholder=" Nova Categoria"
                                autoFocus={true}
                                value={newCategory}
                                onChangeText={setNewCategory}
                            />

                            <BtnNewCategory onPress={addNewCategory} underlayColor="#ff3b47">
                                <TextBtnSave>Salvar</TextBtnSave>
                            </BtnNewCategory>

                            <BtnCancel onPress={() => setModalVisible(false)} underlayColor="transparent">
                                <TextBtnCancel>Cancelar</TextBtnCancel>
                            </BtnCancel>

                        </ModalBody>
                    </ModalBox>
                </Modal>

            </ContainerInputs>
        </Container>
    );
}


const mapStateToProps = (state) => {
    return {
        theme: state.userReducer.theme
    };
}

export default connect(mapStateToProps)(EditExpense);