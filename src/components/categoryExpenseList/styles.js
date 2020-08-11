import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

export const Container = styled.View `
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 10px;
    padding-top: 10px;
`;

export const Btns = styled.View `
    flex-direction: row;
`;

export const Touchable = styled.TouchableHighlight ``;

export const IconBtns = styled.Image `
    width: 18px;
    height: 18px;
    margin-right: 10px;
`;

export const CategoryName = styled.Text `
    font-size: 15px;
    color: #ff4f5a;
`;

export const Modal = styled.Modal ``;

export const ModalBox = styled.View `
    width: ${width}px;
    height: ${height}px;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
`;

export const ModalBody = styled.View `
    width: 90%;
    height: 200px;
    border-radius: 10px;
    background-color: ${props => props.theme.card};
    padding:10px;
`;

export const InputNewCategory = styled.TextInput `
    font-size: 21px;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
    padding: 10px;
    color: ${props => props.theme.descCard};
`;

export const BtnNewCategory = styled.TouchableOpacity `
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-top: 20px;
    background-color: #ff4f5a;
    border-radius: 5px;
`;

export const TextBtnSave = styled.Text `
    color: #fff;
`;

export const BtnCancel = styled.TouchableHighlight `
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

    export const TextBtnCancel = styled.Text `
    font-size: 12px;
    color: ${props => props.theme.descCard};
`;