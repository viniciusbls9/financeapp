import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    header: {
        padding: 20,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textHeader: {
        fontSize: 16,
        color: '#1c2e35',
    },
    userWallet: {
        paddingHorizontal: 20,
    },
});