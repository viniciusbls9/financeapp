import React, { useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Switch } from 'react-native';
import { Picker } from '@react-native-community/picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { useNavigation, CommonActions } from '@react-navigation/native';
import styles from './styles';
import Arrow from '../../assets/arrows.png';

export default function AddRevenue() {

    const [value, setValue] = useState('');
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled, setIsEnabled] = useState(true);
    const [description, setDescription] = useState('');
    const [picker, setPicker] = useState('');
    const [messageError, setMessageError] = useState('')

    const navigation = useNavigation();

    function handlebackExpense() {
        navigation.navigate('Expenses');
    }

    function addNewExpense() {
        //INFORMAÇÕES DO USUÁRIO
        let uid = auth().currentUser.uid;
        let newExpense = database().ref('finance_expense').child(uid);

        if (value != '' && description != '' && picker != '') {
            // CADASTRO DA DESPESA
            let key = newExpense.push().key;
            newExpense.child(key).set({
                value: value,
                toggle: isEnabled,
                description: description,
                category: picker,
                tag: picker,
                date: Date.now(),
            });
            setValue('');
            setDescription('');
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'Home'},
                        { name: 'Expenses'},
                    ]
                }));
        } else {
            setMessageError('Preencha todos os campos');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableHighlight underlayColor="transparent" onPress={handlebackExpense} style={styles.backExpense}>
                    <>
                        <Image source={Arrow} style={styles.backImage} />
                        <Text style={styles.textHeader}>Receitas</Text>
                    </>
                </TouchableHighlight>
            </View>

            <View style={styles.containerInputValue}>
                <Text style={styles.labelFormValue}>Valor da despesa (apenas números)</Text>
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

            <View style={styles.containerInputs}>
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

                <Text style={styles.labelInputs}>Categoria</Text>
                <Picker
                    selectedValue={picker}
                    onValueChange={(itemValue, itemIndex) => setPicker(itemValue)}
                    value={setPicker}
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
                </Picker>

                <View style={styles.containerbtnSave}>
                    <TouchableOpacity onPress={addNewExpense} style={styles.btnSave}>
                        <Text style={styles.textBtnSave}>Salvar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}