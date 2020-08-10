import styled from 'styled-components/native';

export const Container = styled.TouchableHighlight `
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    border-color: ${props => props.theme.shadowCard};
    border-bottom-width: 1px;
    border-radius: 15px;
    padding: 15px;
    background-color: ${props => props.theme.card};
    elevation: 4;
    margin: 12px 20px 0 20px;
`;

export const InfoRevenue = styled.View `
`;

export const ContainerData = styled.View `
    flex-direction: row;
`;

export const ContainerIcon = styled.View `
    background-color: #ff4f5a;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 25px;
`;

export const IconRevenue = styled.Image `
    width: 25px;
    height: 25px;
`;

export const ContainerInfo = styled.View `
    flex-direction: column;
`;

export const DescRevenue = styled.Text `
    font-weight: 700;
    width: 150px;
    color: ${props => props.theme.descCard};
`;

export const ContainerTexts = styled.View `
    flex-direction: row;
`;

export const CatRevenue = styled.Text `
    font-size: 11px;
    color: ${props => props.theme.subDescCard};
`;

export const DateRevenue = styled.Text `
    font-size: 11px;
    color: ${props => props.theme.subDescCard};
`;

export const InfoValueRevenue = styled.View `
    justify-content: center;
    align-items: flex-end;
`;

export const ValueRevenue = styled.Text `
    color: #ff4f5a;
    font-weight: bold;
`;

export const DateRemember = styled.Text `
    color: #ff4f5a;
    font-weight: bold;
`;

export const IconPay = styled.Image `
    width:15px;
    height: 15px;
    margin-top: 10px;
`;