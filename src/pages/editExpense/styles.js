import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height


import styled from 'styled-components/native';

export const Container = styled.View `
    flex: 1;
    background-color: #ff4f5a;
`;

export const Header = styled.View `
    padding: 20px;
    height: 100px;
    background-color: #ff4f5a;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const BackExpense = styled.TouchableHighlight `
    flex-direction: row;
    align-items: center;
`;

export const BackImage = styled.Image `
    width: 25px;
    height: 25px;
    margin-right: 20px;
`;

export const TextHeader = styled.Text `
    font-size: 16px;
    color: #fff;
`;

export const DeleteExpense = styled.TouchableHighlight `
    width: 25px;
    height: 25px;
`;

export const ContainerInputValue = styled.View `
    padding: 0 20px 0 20px
`;

export const TextFormValue = styled.View `
    flex-direction: row;
`;

export const LabelFormValue = styled.Text `
    color: #fff;
    font-weight: bold;
    font-size: 13px;
`;

export const InputValue = styled.TextInput `
    color: #fff;
    font-size: 30px;
`;

export const ContainerInputs = styled.ScrollView `
    flex: 1;
    padding: 30px 20px 0 20px;
    background-color: ${props => props.theme.card};
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
`;

export const ContainerSwitch = styled.View `
    flex-direction: row;
    justify-content: space-between;
    border-bottom-color: #ccc;
    border-bottom-width: 1px;
    padding-bottom: 20px;
    margin-bottom: 20px;
`;

export const LabelSwitch = styled.Text `
    font-size: 20px;
    color: ${props => props.theme.descCard};
`;

export const Switch = styled.Switch ``;

export const LabelInputs = styled.Text `
    color: ${props => props.theme.descCard};
`;

export const InputDesc = styled.TextInput `
    border-bottom-width: 1px;
    border-color: #ccc;
    margin-bottom: 20px;
    color: ${props => props.theme.descCard};
`;

export const ContainerPicker = styled.View `
    border-bottom-color: #ccc;
    border-bottom-width: 1px;
    padding-bottom: 20px;
    margin-bottom: 20px;
`;

export const ContainerCalendar = styled.View `
    border-bottom-color: #ccc;
    border-bottom-width: 1px;
    padding-bottom: 20px;
    margin-bottom: 20px;
`;

export const BtnCalendar = styled.TouchableHighlight `
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #ff4f5a;
    padding: 10px;
    margin-top: 10px;
    width: 50%;
    border-radius: 10px;
`;

export const CalendarImage = styled.Image `
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

export const BtnTextCalendar = styled.Text `
    color: #fff;
    justify-content: center;
`;

export const ContainerBtnSave = styled.View `
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
    margin-bottom: 120px;
`;

export const BtnSave = styled.TouchableHighlight `
    background-color: #ff4f5a;
    width: 90%;
    height: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

export const TextBtnSave = styled.Text `
    color: #fff;
`;

export const TextMessageError = styled.Text `
    color: #ff4f5a;
    margin-top: 5px;
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

export const BtnCancel = styled.TouchableHighlight `
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

    export const TextBtnCancel = styled.Text `
    font-size: 12px;
    color: ${props => props.theme.descCard};
`;