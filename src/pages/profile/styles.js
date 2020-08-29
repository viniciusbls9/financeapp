import styled from 'styled-components/native';

export const Scroll = styled.ScrollView ``;

export const Container = styled.View `
    background-color: ${props => props.theme.container};
    flex: 2;
    padding: 20px;
`;

export const ContainerFlex = styled.View `
    flex:3;
`;

export const Header = styled.View `
    height: 100px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const TouchableHeader = styled.TouchableHighlight `
    flex-direction: row;
    align-items: center;
`;

export const TextHeader = styled.Text `
    font-size: 16px;
    color: ${props => props.theme.titlePendencies};
`;

export const UserInfo = styled.View `
    align-items: center;
`;

export const UserImg = styled.Image `
    width: 60px;
    height: 60px;
`;

export const UserName = styled.Text `
    color: ${props => props.theme.titlePendencies};
    font-weight: bold;
    font-size: 15px;
    margin-top: 10px;
`;

export const ContainerWallet = styled.View `
    background-color: ${props => props.theme.card};
    padding: 20px;
    margin-top: 20px;
    elevation: 2;
    border-radius: 25px;
`;

export const WalletLabel = styled.Text `
    margin-bottom: 10px;
    color: ${props => props.theme.titlePendencies};
`;

export const BtnWallet = styled.TouchableHighlight `
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    padding: 6px;
`;

export const WalletImg = styled.Image `
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

export const TextWallet = styled.Text `
    color: ${props => props.theme.titlePendencies};
`;