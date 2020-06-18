import React, { useState } from 'react';
import { View, Text, Image, TouchableHighlight, Alert, Modal, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useNavigation, CommonActions } from '@react-navigation/native';

import styles from './styles';
import TrashBlack from '../../assets/trash-black.png';
import Edit from '../../assets/edit.png';

export default function CategoryExpenseList(props) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategory, setNewCategory] = useState(props.data.category);

    let uid = auth().currentUser.uid;
    let key = props.data.key;

    function handleEdit() {
        setModalVisible(true);
    }

    function editCategory() {
        let cat = database().ref('finance_revenue_category').child(uid).child(key);

        if (newCategory != '') {
            // ATUALIZAÇÃO DA CATEGORIA
            cat.set({
                category: newCategory,
                date: Date.now(),
            });
            setNewCategory('');
            setModalVisible(false);
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'Category' },
                    ]
                }));
        } else {
            // setMessageError('Preencha todos os campos');
        }
    }

    function handleDelete() {
        Alert.alert(
            'Atenção',
            'Deseja realmente excluir?',
            [
                {
                    text: 'Sim',
                    onPress: () => {
                        database().ref('finance_expense_category').child(uid).child(key).remove();
                        // navigation.dispatch(
                        //     CommonActions.reset({
                        //         index: 1,
                        //         routes: [
                        //             { name: 'Category' },
                        //         ]
                        //     }));
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

    return (
        <View style={styles.container} underlayColor="#transparent">
            <TouchableHighlight style={styles.btns}>
                <>
                    <TouchableHighlight onPress={handleEdit} underlayColor="transparent">
                        <Image source={Edit} style={styles.iconBtns} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={handleDelete} underlayColor="transparent">
                        <Image source={TrashBlack} style={styles.iconBtns} />
                    </TouchableHighlight>
                </>
            </TouchableHighlight>
            <Text style={styles.categoryName}>{props.data.category}</Text>
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

                        <TouchableOpacity onPress={editCategory} style={styles.btnNewCategory}>
                            <Text style={styles.textBtnSave}>Salvar</Text>
                        </TouchableOpacity>

                        <TouchableHighlight style={styles.btnCancel} onPress={() => setModalVisible(false)} underlayColor="transparent">
                            <Text style={styles.textBtnCancel}>Cancelar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    );
}