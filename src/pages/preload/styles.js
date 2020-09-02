import styled from 'styled-components/native';

export const Container = styled.View `
    flex:1;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.containerBudget};
`;

export const Load = styled.ActivityIndicator `
    margin-bottom: 20px;
`;

export const TextPreload = styled.Text `
    color: ${props => props.theme.titlePendencies};
`;