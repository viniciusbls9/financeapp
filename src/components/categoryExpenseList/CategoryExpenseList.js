import React, { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { connect } from 'react-redux';

import { Container, Btns, Touchable, IconBtns, CategoryName, Modal, ModalBox, ModalBody, InputNewCategory, BtnNewCategory, TextBtnSave, BtnCancel, TextBtnCancel } from './styles';
import TrashBlack from '../../assets/trash-black.png';
import Trash from '../../assets/trash.png';
import Edit from '../../assets/edit.png';

function CategoryExpenseList(props) {
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
        <Container>
            <Btns>
                <Touchable onPress={handleEdit} underlayColor="#transparent">
                    <IconBtns source={Edit} />
                </Touchable>

                <Touchable onPress={handleDelete} underlayColor="#transparent">
                    <IconBtns source={props.theme.title == 'light' ? TrashBlack : Trash} />
                </Touchable>
            </Btns>

            <CategoryName>{props.data.category}</CategoryName>
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

                        <BtnNewCategory onPress={editCategory}>
                            <TextBtnSave>Salvar</TextBtnSave>
                        </BtnNewCategory>

                        <BtnCancel onPress={() => setModalVisible(false)} underlayColor="transparent">
                            <TextBtnCancel>Cancelar</TextBtnCancel>
                        </BtnCancel>

                    </ModalBody>
                </ModalBox>

            </Modal>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.userReducer.theme
    };
}

export default connect(mapStateToProps)(CategoryExpenseList);