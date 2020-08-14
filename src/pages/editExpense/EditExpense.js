import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, StatusBar, TextInput, Switch, Alert, ScrollView, Modal } from 'react-native';
import { Picker } from '@react-native-community/picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import styles from './styles';
import Arrow from '../../assets/arrows.png';
import Trash from '../../assets/trash.png';
import Calendar from '../../assets/calendar.png';
import ColorExpense from '../../components/colorsExpense/ColorExpense';

export default function EditExpense() {
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

    /** CONSTANT FOR ANIMATION THE TOOLTIP */
    const [showTooltip, setShowTooltip] = useState(false);

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

    function handlebackExpense() {
        navigation.navigate('Expenses');
    }

    function formatarMoeda() {
        var elemento = editValue;
        var valor = elemento.valueOf();

        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g,''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");
        // console.log(valor);
        
        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        
        if(valor == 'NaN') {
            return false;
        } else {
            return '-'+valor;
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

        if (editValue != '' && editDescription != '' && editCategory != 'Selecione...') {
            // CADASTRO DA RECEITA
            newEditExpense.set({
                value: editValue.replace(',', ''),
                toggle: editToggle,
                description: editDescription,
                category: editCategory,
                tag: editCategory,
                date: date,
                remember: remember < new Date(Date.now()).getDate() ? remember : '',
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

    function handleAnimation() {
        setShowTooltip(true);
        setTimeout(() => {
            setShowTooltip(false);
        }, 3000);
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#ff4f5a" barStyle="light-content" />
            <View style={styles.header}>
                <TouchableHighlight underlayColor="transparent" onPress={handlebackExpense} style={styles.backExpense}>
                    <>
                        <Image source={Arrow} style={styles.backImage} />
                        <Text style={styles.textHeader}>Despesas</Text>
                    </>
                </TouchableHighlight>

                <TouchableHighlight underlayColor="transparent" onPress={deleteExpense} style={styles.deleteExpense}>
                    <Image source={Trash} style={styles.backImage} />
                </TouchableHighlight>
            </View>

            {showTooltip ? (
                <View style={styles.containerTooltip}>
                    <View style={styles.tooltip}>
                        <Text style={styles.tooltipMessage}>Separe os centavos incluindo ponto</Text>
                    </View>
                    <View style={styles.tooltipTriangle} />
                </View>
            ) : null}

            <View style={styles.containerInputValue}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelFormValue}>Valor da receita</Text>
                    <TouchableHighlight style={styles.containerBtnTooltip} onPress={handleAnimation} underlayColor="#transparent">
                        <Text style={styles.textTooltip}>?</Text>
                    </TouchableHighlight>
                </View>
                <TextInput
                    style={styles.inputValue}
                    placeholder=" R$ 00,00"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    autoFocus={true}
                    value={formatarMoeda(editValue)}
                    onChangeText={setEditValue}
                />
            </View>

            <ScrollView style={styles.containerInputs}>
                <View style={styles.containerSwitch}>
                    <Text style={styles.labelSwitch}>Recebido</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff4f5a" }}
                        thumbColor={editToggle ? "#ff4f5a" : "#ff4f5a"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={setEditToogle}
                        value={editToggle}
                    />
                </View>

                <Text style={styles.labelInputs}>Descrição</Text>
                <TextInput
                    style={styles.input}
                    value={editDescription}
                    onChangeText={setEditDescription}
                />

                <View style={styles.picker}>
                    <Text style={styles.labelInputs}>Categoria</Text>
                    <Picker
                        selectedValue={editCategory}
                        onValueChange={(itemValue, itemIndex) => {
                            if (itemValue == 'Nova categoria') {
                                openModal(itemValue);
                            } else {
                                setEditCategory(itemValue);
                            }
                        }}
                        value={setEditCategory}
                        mode="dropdown"
                    >
                        <Picker.Item key={0} value={'Selecione...'} label={'Selecione...'} />
                        <Picker.Item key={1} value={'Alimentação'} label={'Alimentação'} />
                        <Picker.Item key={2} value={'Educação'} label={'Educação'} />
                        <Picker.Item key={3} value={'Lazer'} label={'Lazer'} />
                        <Picker.Item key={4} value={'Moradia'} label={'Moradia'} />
                        <Picker.Item key={5} value={'Pagamentos'} label={'Pagamentos'} />
                        <Picker.Item key={5} value={'Roupas'} label={'Roupas'} />
                        <Picker.Item key={5} value={'Saúde'} label={'Saúde'} />
                        <Picker.Item key={5} value={'Transporte'} label={'Transporte'} />
                        <Picker.Item key={5} value={'Outros'} label={'Outros'} />
                        {getNewCategory}
                        <Picker.Item key={1} value={'Nova categoria'} label={'Nova categoria'} />

                    </Picker>
                </View>

                <View style={styles.picker}>
                    <Text style={styles.labelInputs}>Carteira</Text>
                    <Picker
                        selectedValue={account}
                        onValueChange={(itemValue) => {
                            if (itemValue == 'Adicionar conta') {
                                navigation.navigate('AddWallet');
                            } else {
                                setAccount(itemValue);
                            }
                        }}
                        value={setAccount}
                        mode="dropdown"
                    >
                        <Picker.Item key={0} value={'Selecione sua carteira'} label={'Selecione sua carteira'} />
                        {getAccount}
                        {getAccount == '' &&
                            <Picker.Item key={0} value={'Adicionar conta'} label={'Adicionar conta'} />
                        }
                    </Picker>
                </View>

                <View style={styles.containerCalendar}>
                    <Text style={styles.labelInputs}>Data de pagamento</Text>
                    <TouchableOpacity onPress={showDatepickerDate} style={styles.btnCalendar}>
                        <>
                            <Image source={Calendar} style={styles.calendarImage} />
                            <Text style={styles.btnTextCalendar}>Selecionar data</Text>
                        </>
                    </TouchableOpacity>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={editDate}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                    />
                )}

                <View style={styles.containerRemember}>
                    <Text style={styles.labelInputs}>Lembrar-me</Text>
                    <TouchableOpacity onPress={showDatepickerRemember} style={styles.btnCalendar}>
                        <>
                            <Image source={Calendar} style={styles.calendarImage} />
                            <Text style={styles.btnTextCalendar}>Selecionar data</Text>
                        </>
                    </TouchableOpacity>
                </View>
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

                <View style={styles.containerbtnSave}>
                    <TouchableOpacity onPress={editExpense} style={styles.btnSave}>
                        <Text style={styles.textBtnSave}>Salvar</Text>
                    </TouchableOpacity>
                    <Text style={styles.textMessageError}>{messageError}</Text>
                </View>

                <Modal
                    visible={modalVisible}
                    animationType="fade"
                    transparent={true}
                >
                    <View style={styles.modalBox}>
                        <View style={styles.modalBody}>
                            <TextInput
                                style={styles.inputNewCategory}
                                placeholder=" Nova Categoria"
                                autoFocus={true}
                                value={newCategory}
                                onChangeText={setNewCategory}
                            />

                            <TouchableOpacity onPress={addNewCategory} style={styles.btnNewCategory}>
                                <Text style={styles.textBtnSave}>Salvar</Text>
                            </TouchableOpacity>

                            <TouchableHighlight style={styles.btnCancel} onPress={() => setModalVisible(false)} underlayColor="transparent">
                                <Text style={styles.textBtnCancel}>Cancelar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        </View>
    );
}
