import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5c8efe',
    },
    typeBank: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        padding: 15,
    },
    selectedBank: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    containerInitialBank: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textInitialBank: {
        color: '#fff'
    },
    nameBank: {
        marginVertical: 10,
    },
});


import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: ${props => props.theme.container};
`;

export const Header = styled.View`
    padding: 20px;
    height: 80px;
    background-color: #5c8efe;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const BackButton = styled.TouchableHighlight`
    flex-direction: row;
`;

export const BackImage = styled.Image`
    width: 25px;
    height: 25px;
    margin-right: 20px;
`;

export const TextHeader = styled.Text`
    font-size: 16px;
    color: #fff;
`;

export const FieldsWallet = styled.View`
    padding: 0 20px 0 20px;
`;

export const Label = styled.Text`
    color: ${props => props.theme.descCard};
    font-size: 15px;
    margin-bottom: 10px;
    margin-top: 30px;
    padding-bottom: 10px;
`;

export const ContainerPicker = styled.View`
    border-bottom-color: #ccc;
    border-bottom-width: 1px;
    padding-bottom: 20px;
    margin-bottom: 20px;
`;

export const InputName = styled.TextInput`
    border-bottom-width: 1px;
    border-color: #ccc;
    margin-bottom: 20px;
    color: ${props => props.colorName}
`;

export const ContainerBtnSave = styled.View`
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
    margin-bottom: 120px;
`;

export const BtnSave = styled.TouchableHighlight`
    background-color: #ff4f5a;
    width: 90%;
    height: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

export const TextBtnSave = styled.Text`
    color: #fff;
`;

export const TextMessageError = styled.Text `

`;