import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        height: 100,
        // backgroundColor: '#27B635',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconMoreExpenses: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    textHeader: {
        fontSize: 16,
        color: '#00f',
    },
});