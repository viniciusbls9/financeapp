import styled from 'styled-components/native';

export const Container = styled.View `
    flex: 1;
    background-color: ${props => props.theme.container};
`;

export const Header = styled.View `
    padding: 20px;
    height: 100px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Touchable = styled.TouchableOpacity `
    flex-direction: row;
    justify-content: center;
`;

export const TextHeader = styled.Text `
    font-size: 16px;
    color: ${props => props.theme.titlePendencies};
`;