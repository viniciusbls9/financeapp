import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle `
    View {
        background-color: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
    }
`