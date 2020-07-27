import styled from 'styled-components/native';

export const Wrapper = styled.View `
    background: ${props => props.theme.background};
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

export const Header = styled.View `
    padding: 20px;
    height: 100px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const BtnBackButton = styled.TouchableHighlight `
    width: 16px;
    height: 16px;
    margin-right: 10px;
`;

export const BackButton = styled.Image `
    width: 30px;
    height: 30px;
`;

export const Image = styled.Image `
    width: 290px;
    height: 290px;
`;

export const Title = styled.Text `
    color: ${props => props.theme.color};
    font-size: 16px;
    text-align: center;
`;
