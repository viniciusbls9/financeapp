import { StatusBar, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('screen').height);

import styled from 'styled-components/native';

export const Container = styled.ScrollView `
    flex: 1;
    background-color: ${props => props.theme.containerBudget};
    height: 80px;
`;

export const ContainerInfo = styled.View `
    height: ${screenHeight}px;
`;

export const Header = styled.View `
    padding-top: ${StatusBar.currentHeight}px;
    padding-horizontal: 24px;
    background-color: ${props => props.theme.card};
    height: undefined;
    padding-bottom: 20px;
    margin-bottom: 30px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    elevation: 4;
`;

export const HeaderButtons = styled.View `
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
`;

export const HeaderBtn = styled.TouchableHighlight ``;

export const Bars = styled.Image `
    width: 25px;
    height: 25px;
`;

export const Users = styled.Image `
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border-width: 1px;
    border-color: #ccc;
`;

export const LabelInfoMoney = styled.Text `
    color: ${props => props.theme.titlePendencies};
    font-size: 15px;
    margin-bottom: 10px;
`;

export const InfoMoney = styled.View `
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const ValueMoney = styled.View `
    flex-direction: row;
`;

export const TotalMoney = styled.Text `
    color: ${props => props.theme.titlePendencies};
    font-size: 30px;
`;

export const ContainerHidden = styled.View `
    height: 10px;
    width: 120px;
    background-color: #ebebeb;
`;

export const HiddenValue = styled.TouchableHighlight ``;

export const HiddenMoney = styled.Image `
    width: 20px;
    height: 20px;
    margin-left: 5px;
`;

export const ContainerAddMoney = styled.TouchableHighlight `
    flex-direction: row;
    align-items: center; 
`;

export const AddIcon = styled.Image `
    width: 15px;
    height: 15px;
`;

export const AddMoneyText = styled.Text `
    color: ${props => props.theme.titlePendencies};
    margin-left: 10px;
`;

export const InfoActivity = styled.View `
    padding: 0 20px 0 20px;
`;

export const LabelinfoActivity = styled.Text `
    color: ${props => props.theme.titlePendencies};
    font-weight: bold;
    font-size: 15px;
`;

export const Pendencies = styled.ScrollView `
    width: ${screenWidth}px;
`;

export const ContainerMsg = styled.View `
    background-color: ${props => props.theme.card};
    border-radius: 25px;
    border-width: 1px;
    border-color: ${props => props.theme.shadowCard};
    margin-top: 20px;
    margin-bottom: 20px;
    align-items: center;
    padding: 20px
`;

export const ImageMsg = styled.Image `
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
`;

export const TextMsg = styled.Text `
    text-align: center;
    color: ${props => props.theme.titlePendencies};
`;

export const ContainerChart = styled.View `
    background-color: ${props => props.theme.card};
    border-radius: 25px;
    border-width: 1px;
    border-color: ${props => props.theme.shadowCard};
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 12px;
`;

export const LoveMsg = styled.Text `
    margin-bottom: 10px;
    text-align: center;
    color: ${props => props.theme.titlePendencies};
`;