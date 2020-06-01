import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, StatusBar, TextInput, Switch } from 'react-native';
import { Picker } from '@react-native-community/picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { useNavigation, CommonActions } from '@react-navigation/native';
import styles from './styles';
import Arrow from '../../assets/arrows.png';

export default function AddRevenue() {
    const navigation = useNavigation();

    const [value, setValue] = useState('');
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled, setIsEnabled] = useState(true);
    const [description, setDescription] = useState('');
    const [picker, setPicker] = useState('');
    const [messageError, setMessageError] = useState('');

    function handlebackRevenue() {
        navigation.navigate('Revenue');
    }

    function addNewRevenue() {
        //INFORMAÇÕES DO USUÁRIO
        let uid = auth().currentUser.uid;
        let newRevenue = database().ref('finance_revenue').child(uid);

        if (value != '' && description != '' && picker != '') {
            // CADASTRO DA RECEITA
            let key = newRevenue.push().key;
            newRevenue.child(key).set({
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
                        { name: 'Revenue'},
                    ]
                }));
            // navigation.navigate('Revenue');
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

            <View style={styles.containerInputs}>
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

                <Text style={styles.labelInputs}>Categoria</Text>
                <Picker
                    selectedValue={picker}
                    onValueChange={(itemValue, itemIndex) => setPicker(itemValue)}
                    value={setPicker}
                    mode="dropdown"
                >
                    <Picker.Item key={0} value={'Selecione...'} label={'Selecione...'} />
                    <Picker.Item key={1} value={'Salário'} label={'Salário'} />
                    <Picker.Item key={2} value={'Prêmio'} label={'Prêmio'} />
                    <Picker.Item key={3} value={'Investimento'} label={'Investimento'} />
                    <Picker.Item key={4} value={'Presente'} label={'Presente'} />
                    <Picker.Item key={5} value={'Outros'} label={'Outros'} />
                </Picker>

                <View style={styles.containerbtnSave}>
                    <TouchableOpacity onPress={addNewRevenue} style={styles.btnSave}>
                        <Text style={styles.textBtnSave}>Salvar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}
