import styled from 'styled-components/native';

export const Container = styled.View `
    padding: 0px 20px 0 20px;
`;

export const ContainerActivity = styled.View `
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    padding: 20px;
    border-radius: 20px;
    border-color: #ccc;
    border-width: 1px;
    background-color: #fff;
    elevation: 4;
    background-color: ${props => props.theme.container};
`;

export const ContainerBank = styled.View `
    flex-direction: row;
    align-items: center;
`;

export const ContainerInitialBank = styled.View `
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    background-color: ${props => props.bgInitial}

`;

export const TextInitialBank = styled.Text `
    color: #fff;
`;

export const TextsActivity = styled.View `
    width: 290px;
    height: 290px;
`;

export const TextValue = styled.Text `
    color: ${props => props.color};
    font-size: 18px;
    font-weight: bold;
`;
