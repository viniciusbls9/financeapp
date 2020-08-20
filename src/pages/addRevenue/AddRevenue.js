import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { connect } from 'react-redux';

import { useNavigation, CommonActions } from '@react-navigation/native';

import { Container, Header, BackExpense, BackImage, TextHeader, ContainerInputValue, TextFormValue, LabelFormValue, InputValue, ContainerInputs, ContainerSwitch, Switch, LabelSwitch, LabelInputs, InputDesc, ContainerPicker, ContainerCalendar, BtnCalendar, CalendarImage, BtnTextCalendar, ContainerBtnSave, BtnSave, TextBtnSave, TextMessageError, Modal, ModalBox, ModalBody, InputNewCategory, BtnNewCategory, BtnCancel, TextBtnCancel } from './styles';
import Arrow from '../../assets/arrows.png';
import Calendar from '../../assets/calendar.png';

function AddRevenue(props) {
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

    /** CONSTANT FOR ADD NEW REVENUE */
    const [value, setValue] = useState('');
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled, setIsEnabled] = useState(true);
    const [description, setDescription] = useState('');
    const [picker, setPicker] = useState('');
    const [account, setAccount] = useState('');
    // const [sumPaid, setSumPaid] = useState([]);
    // const [sumUnpaid, setSumUnpaid] = useState([]);

    /**CONSTANT FOR VISIBLE ERROR MESSAGE */
    const [messageError, setMessageError] = useState('');

    /**CONSTANT FOR OPEN MODAL */
    const [modalVisible, setModalVisible] = useState(false);

    /**CONSTANT FOR ADD NEW CATEGORY */
    const [newCategory, setNewCategory] = useState('');
    const [getNewCategory, setGetNewCategory] = useState([]);

    /**CONSTANT TO RECEIVE VALUES ​​FROM THE BANK REGARDING THE ACCOUNTS CREATED BY THE USER  */
    const [getAccount, setGetAccouunt] = useState([]);

    // useEffect(() => {
    //     database().ref('finance_wallet').child(uid).child('finance_sum_revenue_paid')
    //     .once("value")
    //     .then((snapshot) => {
    //         setSumPaid(snapshot.val());
    //     });
    // }, []);

    // useEffect(() => {
    //     database().ref('finance_wallet').child(uid).child('finance_sum_revenue_unpaid')
    //     .once("value")
    //     .then((snapshot) => {
    //         setSumUnpaid(snapshot.val());
    //     });
    // }, []);

    function addNewRevenue() {
        let newRevenue = database().ref('finance_wallet').child(uid).child(account).child('finance_revenue');

        // let sumRevenuePaid = database().ref('finance_wallet').child(uid).child('finance_sum_revenue_paid');
        // let sumRevenueUnpaid = database().ref('finance_wallet').child(uid).child('finance_sum_revenue_unpaid');

        if (value != '' && description != '' && picker != '' && account != '') {
            // CADASTRO DA RECEITA
            let key = newRevenue.push().key;
            newRevenue.child(key).set({
                value: value.replace(',', '').replace('.', ''),
                toggle: isEnabled,
                description: description,
                category: picker,
                tag: picker,
                date: date,
                remember: remember < new Date(Date.now()).getDate() ? remember : '',
                account: account,
            });

            // if(value != '' && description != '' && picker != '' && account != '' && isEnabled === true) {
            //     sumRevenuePaid.set(sumPaid != null ? parseInt(value) + parseInt(sumPaid) : value);
            // } else if(value != '' && description != '' && picker != '' && account != '' && isEnabled === false) {
            //     sumRevenueUnpaid.set(sumUnpaid != null ? parseInt(value) + parseInt(sumUnpaid) : value)
            // }

            setValue('');
            setDescription('');
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'Revenue' },
                    ]
                }));
            // navigation.navigate('Revenue');
        } else {
            setMessageError('Preencha todos os campos obrigatórios');
        }
    }

    /** RECOVERING INFORMATION IN THE BANK RELATING TO USER'S REVENUE CATEGORIES */
    useEffect(() => {
        database().ref('finance_revenue_category')
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
        let cat = database().ref('finance_revenue_category').child(uid);
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
        <Container>
        <Header>
            <BackExpense onPress={() => navigation.navigate('Revenue')} underlayColor="transparent">
                <>
                    <BackImage source={Arrow} />
                    <TextHeader>Receitas</TextHeader>
                </>
            </BackExpense>
        </Header>

        <ContainerInputValue>
            <TextFormValue>
                <LabelFormValue>Valor da receita</LabelFormValue>
            </TextFormValue>
            <InputValue
                placeholder=" R$ 00,00"
                placeholderTextColor="#fff"
                keyboardType="numeric"
                autoFocus={true}
                value={formatarMoeda(value)}
                onChangeText={setValue}
            />
        </ContainerInputValue>

        <ContainerInputs>
            <ContainerSwitch>
                <LabelSwitch>Pago</LabelSwitch>
                <Switch
                    trackColor={{ false: "#767577", true: "#27B635" }}
                    thumbColor={isEnabled ? "#27B635" : "#27B635"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </ContainerSwitch>

            <LabelInputs>Descrição</LabelInputs>
            <InputDesc
                value={description}
                onChangeText={setDescription}
            />

            <ContainerPicker>
                <LabelInputs>Categoria</LabelInputs>
                <Picker
                    selectedValue={picker}
                    onValueChange={(itemValue, itemIndex) => {
                        if (itemValue == 'Nova categoria') {
                            openModal(itemValue);
                        } else {
                            setPicker(itemValue);
                        }
                    }}
                    style={{color: props.theme.descCard}}
                    value={setPicker}
                    mode="dropdown"
                >
                    <Picker.Item key={0} value={''} label={'Selecione a categoria'} />
                    <Picker.Item key={1} value={'Salário'} label={'Salário'} />
                    <Picker.Item key={2} value={'Prêmio'} label={'Prêmio'} />
                    <Picker.Item key={3} value={'Investimento'} label={'Investimento'} />
                    <Picker.Item key={4} value={'Presente'} label={'Presente'} />
                    <Picker.Item key={5} value={'Outros'} label={'Outros'} />
                    {getNewCategory}
                    <Picker.Item key={6} value={'Nova categoria'} label={'Nova categoria'} />

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
                    style={{color: props.theme.descCard}}
                    value={setAccount}
                    mode="dropdown"
                >
                    <Picker.Item key={0} value={''} label={'Selecione sua carteira'} />
                    {getAccount}
                    <Picker.Item key={0} value={'Adicionar carteira'} label={'Adicionar carteira'} />
                </Picker>
            </ContainerPicker>

            <ContainerCalendar>
                <LabelInputs>Data de pagamento</LabelInputs>
                <BtnCalendar onPress={showDatepickerDate} underlayColor="#22a32f">
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
                <BtnCalendar onPress={showDatepickerRemember} underlayColor="#22a32f">
                    <>
                        <CalendarImage source={Calendar} />
                        <BtnTextCalendar>Selecionar data</BtnTextCalendar>
                    </>
                </BtnCalendar>
            </ContainerCalendar>
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

            <ContainerBtnSave>
                <BtnSave onPress={addNewRevenue} underlayColor="#22a32f">
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

                        <BtnNewCategory onPress={addNewCategory} underlayColor="#22a32f">
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

export default connect(mapStateToProps)(AddRevenue);