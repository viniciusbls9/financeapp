import React, { useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, StatusBar, TextInput, Switch, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import styles from './styles';
import Arrow from '../../assets/arrows.png';
import Trash from '../../assets/trash.png';

export default function EditRevenue() {
    const navigation = useNavigation();
    const route = useRoute();

    const [editCategory, setEditCategory] = useState(route.params.category);
    const [editDescription, setEditDescription] = useState(route.params.description);
    const [editTag, setEditTag] = useState(route.params.tag);
    const [editToggle, setEditToogle] = useState(route.params.toggle);
    const [editValue, setEditValue] = useState(route.params.value);
    const key = route.params.key;
    const uid = auth().currentUser.uid;

    function deleteRevenue() {
        Alert.alert(
            'Atenção',
            'Deseja realmente excluir?',
            [
                {
                    text: 'Sim',
                    onPress: () => {
                        database().ref('finance_revenue').child(uid).child(key).remove()
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [
                                    // { name: 'Home'},
                                    { name: 'Revenue'},
                                ]
                            }));
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

    function handlebackRevenue() {
        navigation.navigate('Revenue');
    }

    function editRevenue() {
        //INFORMAÇÕES DO USUÁRIO
        let newEditRevenue = database().ref('finance_revenue').child(uid).child(key);

        if (editValue != '' && editDescription != '' && editCategory != '') {
            // CADASTRO DA RECEITA
            newEditRevenue.set({
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
                        { name: 'Revenue'},
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

                <TouchableHighlight underlayColor="transparent" onPress={deleteRevenue} style={styles.deleteExpense}>
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
                        trackColor={{ false: "#767577", true: "#27B635" }}
                        thumbColor={editToggle ? "#27B635" : "#27B635"}
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
                    <Picker.Item key={1} value={'Salário'} label={'Salário'} />
                    <Picker.Item key={2} value={'Prêmio'} label={'Prêmio'} />
                    <Picker.Item key={3} value={'Investimento'} label={'Investimento'} />
                    <Picker.Item key={4} value={'Presente'} label={'Presente'} />
                    <Picker.Item key={5} value={'Outros'} label={'Outros'} />
                </Picker>

                <View style={styles.containerbtnSave}>
                    <TouchableOpacity onPress={editRevenue} style={styles.btnSave}>
                        <Text style={styles.textBtnSave}>Salvar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}
