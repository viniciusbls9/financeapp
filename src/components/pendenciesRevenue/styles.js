// import { StyleSheet } from 'react-native';

// export default StyleSheet.create({
//     containerActivity: {
//         flex: 1,
//         marginTop: 20,
//         marginRight: 20,
//         marginBottom: 50,
//         padding: 20,
//         borderRadius: 20,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         backgroundColor: '#fff',
//         elevation: 4,
//     },
//     iconActivity: {
//         width: 34,
//         height: 34,
//         marginBottom: 8,
//         marginRight: 8
//     },
//     TextsActivity: {
//         // marginRight: 15
//     },
//     titleActivity: {
//         fontSize: 12,
//     },
//     descActivity: {
//         fontSize: 18,
//         color: '#27B635',
//         fontWeight: 'bold',
//     },
//     countPendenciesRevenue: {
//         backgroundColor: '#27B635',
//         width:20,
//         height:20,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 10,
//     },
//     valueActivity: {
//         fontWeight: 'bold',
//         fontSize: 12,
//         color: '#fff'
//     }
// });

import styled from 'styled-components/native';

export const ContainerPendencies = styled.View `
    flex: 1;
    margin: 20px 20px 50px 0;
    padding: 20px;
    border-radius: 20px;
    border-color: ${props => props.theme.shadowCard};
    border-width: 1px;
    background-color: ${props => props.theme.card};
    elevation: 4;
`;

export const ContainerInfos = styled.View `
    flex-direction: row;
`;

export const IconActivity = styled.Image `
    width: 34px;
    height: 34px;
    margin-bottom: 8px;
    margin-right: 8px;
`;

export const CountPendenciesRevenue = styled.View `
    background-color: #27B635;
    width:20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
`;

export const ValueActivity = styled.Text `
    font-weight: bold;
    font-size: 12px;
    color: #fff;
`;

export const TextsActivity = styled.View `
    margin-right: 15px;
`;

export const TitleActivity = styled.Text `
    font-size: 12px;
    color: ${props => props.theme.titlePendencies}
`;

export const DescActivity = styled.Text `
    font-size: 18px;
    color: #27B635;
    font-weight: bold;
`;