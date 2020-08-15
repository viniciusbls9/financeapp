import styled from 'styled-components/native';

export const Container = styled.View `
    flex: 1;
    background-color: #ff4f5a;
`;

export const Header = styled.View`
    padding: 20px;
    height: 80px;
    background-color: #ff4f5a;
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

export const ContainerAddRevenue = styled.TouchableHighlight `
    flex-direction: row;
    align-items: center;
`;

export const IconMoreExpenses = styled.Image `
    width: 16px;
    height: 16px;
    margin-right: 10px;
`;

export const TextHeader = styled.Text `
    font-size: 16px;
    color: #fff;
`;

export const ContainerInfo = styled.View `
    padding-top: 25px;
    flex: 1;
    background-color: ${props => props.theme.containerBudget};
`;

export const ContainerTotalExpenses = styled.View `
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
    padding-bottom: 15px;
`;

export const WalletImage = styled.Image `
    width: 28px;
    height: 28px;
`;

export const ContainerValueExpense = styled.View `
    margin-left: 10px;
`;

export const ExpensesTotalText = styled.Text `
    font-size: 13px;
    font-weight: 700;
    color: ${props => props.theme.descCard};
`;

export const ExpenseTotalValue = styled.Text `
    font-size: 16px;
    color: #ff4f5a;
    font-weight: bold;
`;

export const ContainerImage = styled.View `
    justify-content: center;
    align-items: center;
    flex: 3;
`;

export const Img = styled.Image `
    width: 290px;
    height: 290px;
`;

export const TextImg = styled.Text `
    font-size: 14px;
    color: ${props => props.theme.descCard};
`;