import React, { useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Switch, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import styles from './styles';
import Arrow from '../../assets/arrows.png';
import Trash from '../../assets/trash.png';

export default function EditExpense() {
    const navigation = useNavigation();
    const route = useRoute();

    const [editCategory, setEditCategory] = useState(route.params.category);
    const [editDescription, setEditDescription] = useState(route.params.description);
    const [editTag, setEditTag] = useState(route.params.tag);
    const [editToggle, setEditToogle] = useState(route.params.toggle);
    const [editValue, setEditValue] = useState(route.params.value);
    const key = route.params.key;
    let uid = auth().currentUser.uid;
    
    function deleteExpense() {
        Alert.alert(
            'Atenção',
            'Deseja realmente excluir?',
            [
                {
                    text: 'Sim',
                    onPress: () => {
                        database().ref('finance_expense').child(uid).child(key).remove()
                        navigation.navigate('Expenses');
                    },
                    style: 'cancel',
                },
                {
                    text: 'Cancel',
                    onPress: () => { }
                },
            ],
            { cancelable: false },
        );
    }

    function handlebackExpense() {
        navigation.navigate('Expenses');
    }

    function editExpense() {
        //INFORMAÇÕES DO USUÁRIO
        // let uid = auth().currentUser.uid;
        let newEditExpense = database().ref('finance_expense').child(uid).child(key);

        if (editValue != '' && editDescription != '' && editCategory != '') {
            // CADASTRO DA RECEITA
            newEditExpense.set({
                value: editValue,
                toggle: editToggle,
                description: editDescription,
                category: editCategory,
                tag: editCategory,
                date: Date.now(),
            });

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
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

                <TouchableHighlight underlayColor="transparent" onPress={deleteExpense} style={styles.deleteExpense}>
                    <Image source={Trash} style={styles.backImage} />
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
                    value={editValue}
                    onChangeText={setEditValue}
                />
            </View>

            <View style={styles.containerInputs}>
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

                <Text style={styles.labelInputs}>Categoria</Text>
                <Picker
                    selectedValue={editCategory}
                    onValueChange={(itemValue, itemIndex) => setEditCategory(itemValue)}
                    value={editCategory}
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
                    <TouchableOpacity onPress={editExpense} style={styles.btnSave}>
                        <Text style={styles.textBtnSave}>Atualizar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}
