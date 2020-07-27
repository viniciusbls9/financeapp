import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, Image, TextInput, Switch, Modal, ScrollView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useNavigation, CommonActions } from '@react-navigation/native';
import styles from './styles';
import Arrow from '../../assets/arrows.png';
import Calendar from '../../assets/calendar.png';
import ColorExpense from '../../components/colorsExpense/ColorExpense';

export default function AddRevenue() {
    let uid = auth().currentUser.uid;

    /**CONSTANT FOR NAVIGATION */
    const navigation = useNavigation();

    /** CONSTANT FOR USER CHOOSE THE DATE */
    const [date, setDate] = useState(new Date(Date.now()).getTime());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [remember, setRemember] = useState(new Date(Date.now()).getTime());
    const [showRemember, setShowRemember] = useState(false);

    /** DATETIMEPICKER FOR RECEIPT DATE */
    const onChangeDate = (event, selectedDate) => {
        const currentDate = new Date(selectedDate).getTime() || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setIsEnabled(currentDate < new Date(Date.now()) ? true : false);
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
        // console.log(currentRemember);
    };
    const showModeRemember = currentMode => {
        setShowRemember(true);
        setMode(currentMode);
    };
    const showDatepickerRemember = () => {
        showModeRemember('date');
    };

    const [value, setValue] = useState('');
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled, setIsEnabled] = useState(true);
    const [description, setDescription] = useState('');
    const [picker, setPicker] = useState('');
    const [account, setAccount] = useState('');
    // const [sumPaid, setSumPaid] = useState([]);
    // const [sumUnpaid, setSumUnpaid] = useState([]);
    // const [count, setCount] = useState(1);

    /**CONSTANT FOR VISIBLE ERROR MESSAGE */
    const [messageError, setMessageError] = useState('');

    /**CONSTANT FOR OPEN MODAL */
    const [modalVisible, setModalVisible] = useState(false);

    /**CONSTANT FOR ADD NEW CATEGORY */
    const [newCategory, setNewCategory] = useState('');
    const [getNewCategory, setGetNewCategory] = useState([]);

    /**CONSTANT TO RECEIVE VALUES ​​FROM THE BANK REGARDING THE ACCOUNTS CREATED BY THE USER  */
    const [getAccount, setGetAccouunt] = useState([]);

    function handlebackExpense() {
        navigation.navigate('Expenses');
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

    function addNewExpense() {
        //INFORMAÇÕES DO USUÁRIO
        let uid = auth().currentUser.uid;
        let newExpense = database().ref('finance_wallet').child(uid).child(account).child('finance_expense');

        // let sumExpensePaid = database().ref('finance_wallet').child(uid).child('finance_sum_expense_paid');
        // let sumExpenseUnpaid = database().ref('finance_wallet').child(uid).child('finance_sum_expense_unpaid');
        // let counted = database().ref('finance_wallet').child(uid).child('counted_expense');


        if (value != '' && description != '' && picker != '' && account != '') {
            // CADASTRO DA DESPESA
            // setCount(count + 1);
            let key = newExpense.push().key;
            newExpense.child(key).set({
                value: '-'+value,
                toggle: isEnabled,
                description: description,
                category: picker,
                tag: picker,
                date: date,
                remember: remember < new Date(Date.now()).getDate() ? remember : '',
                account: account,
                color: ColorExpense(picker)
            });

            // if(value != '' && description != '' && picker != '' && account != '' && isEnabled === true) {
            //     sumExpensePaid.set(sumPaid != null ? parseInt('-'+value) + parseInt(sumPaid) : '-'+value);
            // } else if(value != '' && description != '' && picker != '' && account != '' && isEnabled === false) {
            //     sumExpenseUnpaid.set(sumUnpaid != null ? parseInt('-'+value) + parseInt(sumUnpaid) : '-'+value)
            // }

            setValue('');
            setDescription('');
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'Home' },
                        { name: 'Expenses' },
                    ]
                }));
        } else {
            setMessageError('Preencha todos os campos obrigatórios');
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
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'AddExpenses' },
                    ]
                }));
        } else {
            setMessageError('Preencha todos os campos');
        }
    }

    function formatarMoeda() {
        var elemento = value;
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
            return valor;
        }
      }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableHighlight underlayColor="transparent" onPress={handlebackExpense} style={styles.backExpense}>
                    <>
                        <Image source={Arrow} style={styles.backImage} />
                        <Text style={styles.textHeader}>Despesas</Text>
                    </>
                </TouchableHighlight>
            </View>

            <View style={styles.containerInputValue}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelFormValue}>Valor da receita</Text>
                </View>
                <TextInput
                    style={styles.inputValue}
                    placeholder=" R$ 00,00"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    autoFocus={true}
                    value={formatarMoeda(value)}
                    onChangeText={setValue}
                />
            </View>

            <ScrollView style={styles.containerInputs}>
                <View style={styles.containerSwitch}>
                    <Text style={styles.labelSwitch}>Pago</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff4f5a" }}
                        thumbColor={isEnabled ? "#ff4f5a" : "#ff4f5a"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

                <Text style={styles.labelInputs}>Descrição</Text>
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                />

                <View style={styles.picker}>
                    <Text style={styles.labelInputs}>Categoria</Text>
                    <Picker
                        selectedValue={picker}
                        onValueChange={(itemValue, itemIndex) => {
                            if (itemValue == 'Nova categoria') {
                                openModal(itemValue);
                            } else {
                                setPicker(itemValue);
                            }
                        }}
                        value={setPicker}
                        mode="dropdown"
                    >
                        <Picker.Item key={0} value={''} label={'Selecione sua categoria'} />
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
                        <Picker.Item key={0} value={''} label={'Selecione sua carteira'} />
                        {getAccount}
                        {getAccount == '' &&
                            <Picker.Item key={0} value={'Adicionar conta'} label={'Adicionar conta'} />
                        }
                    </Picker>
                </View>

                <View style={styles.containerCalendar}>
                    <Text style={styles.labelInputs}>Data de pagamento</Text>
                    <TouchableHighlight onPress={showDatepickerDate} style={styles.btnCalendar} underlayColor="#ff3b47">
                        <>
                            <Image source={Calendar} style={styles.calendarImage} />
                            <Text style={styles.btnTextCalendar}>Selecionar data</Text>
                        </>
                    </TouchableHighlight>
                </View>
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

                <View style={styles.containerRemember}>
                    <Text style={styles.labelInputs}>Lembrar-me</Text>
                    <TouchableHighlight onPress={showDatepickerRemember} style={styles.btnCalendar} underlayColor="#ff3b47">
                        <>
                            <Image source={Calendar} style={styles.calendarImage} />
                            <Text style={styles.btnTextCalendar}>Selecionar data</Text>
                        </>
                    </TouchableHighlight>
                </View>
                {showRemember && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={remember}
                        mode={'datetime'}
                        is24Hour={true}
                        display="default"
                        minimumDate={new Date(Date.now()).getTime()}
                        onChange={onChangeRemember}
                    />
                )}

                <View style={styles.containerbtnSave}>
                    <TouchableHighlight onPress={addNewExpense} style={styles.btnSave} underlayColor="#ff3b47">
                        <Text style={styles.textBtnSave}>Salvar</Text>
                    </TouchableHighlight>
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

                            <TouchableHighlight onPress={addNewCategory} style={styles.btnNewCategory} underlayColor="#ff3b47">
                                <Text style={styles.textBtnSave}>Salvar</Text>
                            </TouchableHighlight>

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