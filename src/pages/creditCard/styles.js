import styled from 'styled-components/native';

export const Wrapper = styled.View `
    background: ${props => props.theme.background};
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text `
    color: ${props => props.theme.color};
    font-size: 40px;
`;