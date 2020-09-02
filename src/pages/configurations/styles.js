import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex:1;
    background-color: ${props => props.theme.containerBudget};
    padding: 20px;
`;

export const Header = styled.View`
    height: 100px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const TouchableHeader = styled.TouchableHighlight`
    flex-direction: row;
    align-items: center;
`;

export const TextHeader = styled.Text`
    font-size: 16px;
    color: ${props => props.theme.titlePendencies};
`;

export const ContainerPicker = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.card};
    padding: 20px;
    margin-top: 20px;
    elevation: 2;
    border-radius: 25px;
    border-color: ${props => props.theme.shadowCard};
    `;

export const ThemeIcon = styled.Image`
    margin-right: 20px;
    width: 20px;
    height: 20px;
`;