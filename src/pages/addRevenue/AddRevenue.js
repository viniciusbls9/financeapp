import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, StatusBar, TextInput, Switch, Modal, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { useNavigation, CommonActions } from '@react-navigation/native';
import styles from './styles';
import Arrow from '../../assets/arrows.png';
import Calendar from '../../assets/calendar.png';

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


    /** CONSTANT FOR ADD NEW REVENUE */
    const [value, setValue] = useState('');
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled, setIsEnabled] = useState(true);
    const [description, setDescription] = useState('');
    const [picker, setPicker] = useState('');

    /**CONSTANT FOR VISIBLE ERROR MESSAGE */
    const [messageError, setMessageError] = useState('');

    /**CONSTANT FOR OPEN MODAL */
    const [modalVisible, setModalVisible] = useState(false);

    /**CONSTANT FOR ADD NEW CATEGORY */
    const [newCategory, setNewCategory] = useState('');

    const [getNewCategory, setGetNewCategory] = useState([]);


    function handlebackRevenue() {
        navigation.navigate('Revenue');
    }

    function addNewRevenue() {
        let newRevenue = database().ref('finance_revenue').child(uid);

        if (value != '' && description != '' && picker != 'Selecione...') {
            // CADASTRO DA RECEITA
            let key = newRevenue.push().key;
            newRevenue.child(key).set({
                value: value,
                toggle: isEnabled,
                description: description,
                category: picker,
                tag: picker,
                date: date,
                remember: remember != new Date(Date.now()).getDate() ? remember : ''
            });
            setValue('');
            setDescription('');
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'Home' },
                        { name: 'Revenue' },
                    ]
                }));
            // navigation.navigate('Revenue');
        } else {
            console.log('Não foi possível cadastrar a receita por estar recebida em uma data futura');
        }
    }

    useEffect(() => {
        database().ref('finance_revenue_category')
            .child(uid)
            .once('value')
            .then((snapshot) => {
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
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'AddRevenue' },
                    ]
                }));
        } else {
            setMessageError('Preencha todos os campos');
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#27B635" barStyle="light-content" />
            <View style={styles.header}>
                <TouchableHighlight underlayColor="transparent" onPress={handlebackRevenue} style={styles.backRevenue}>
                    <>
                        <Image source={Arrow} style={styles.backImage} />
                        <Text style={styles.textHeader}>Receitas</Text>
                    </>
                </TouchableHighlight>
            </View>

            <View style={styles.containerInputValue}>
                <Text style={styles.labelFormValue}>Valor da receita (apenas números)</Text>
                <TextInput
                    style={styles.inputValue}
                    placeholder=" R$ 00,00"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    autoFocus={true}
                    value={value}
                    onChangeText={setValue}
                />
            </View>

            <ScrollView style={styles.containerInputs}>
                <View style={styles.containerSwitch}>
                    <Text style={styles.labelSwitch}>Recebido</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#27B635" }}
                        thumbColor={isEnabled ? "#27B635" : "#27B635"}
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
                        <Picker.Item key={0} value={'Selecione...'} label={'Selecione...'} />
                        <Picker.Item key={1} value={'Salário'} label={'Salário'} />
                        <Picker.Item key={2} value={'Prêmio'} label={'Prêmio'} />
                        <Picker.Item key={3} value={'Investimento'} label={'Investimento'} />
                        <Picker.Item key={4} value={'Presente'} label={'Presente'} />
                        <Picker.Item key={5} value={'Outros'} label={'Outros'} />
                        {getNewCategory}
                        <Picker.Item key={1} value={'Nova categoria'} label={'Nova categoria'} />

                    </Picker>
                </View>

                <View style={styles.containerCalendar}>
                    <Text style={styles.labelInputs}>Data de recebimento</Text>
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
                        value={date}
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
                        value={remember}
                        mode={'datetime'}
                        is24Hour={true}
                        display="default"
                        minimumDate={new Date(Date.now()).getTime()}
                        onChange={onChangeRemember}
                    />
                )}

                <View style={styles.containerbtnSave}>
                    <TouchableOpacity onPress={addNewRevenue} style={styles.btnSave}>
                        <Text style={styles.textBtnSave}>Salvar</Text>
                    </TouchableOpacity>
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
