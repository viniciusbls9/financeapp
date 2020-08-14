// import { StyleSheet, Dimensions } from 'react-native';

// export default StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#5c8efe',
//     },
//     header: {
//         padding: 20,
//         height: 100,
//         backgroundColor: '#5c8efe',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     backImage: {
//         width: 25,
//         height: 25,
//         marginRight: 20,
//     },
//     textHeader: {
//         fontSize: 16,
//         color: '#fff',
//     },
//     containerInfo: {
//         paddingTop: 25,
//         flex: 1,
//         paddingHorizontal: 20,
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 25,
//         borderTopRightRadius: 25,
//     },
//     label: {
//         color: '#1c2e35',
//         fontSize: 15,
//         marginBottom: 10,
//         paddingBottom: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     containerRevenue: {
//         marginBottom: 15,
//         paddingBottom: 10,
//     },
//     containerExpense: {
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//         paddingBottom: 15,
//         marginTop: 25,
//     },
// });

import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #5c8efe;
`;

export const Header = styled.View`
    padding: 20px;
    height: 80px;
    background-color: #5c8efe;
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

export const TextHeader = styled.Text`
    font-size: 16px;
    color: #fff;
`;

export const ContainerInfo = styled.View `
    flex: 1;
    padding: 25px 20px 0 20px;
    background-color: ${props => props.theme.container};
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
`;

export const Label = styled.Text `
    color: ${props => props.theme.descCard};
    font-size: 15px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
`;