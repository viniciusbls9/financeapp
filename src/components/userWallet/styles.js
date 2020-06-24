import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerActivity: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        padding: 20,
        borderRadius: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#fff',
        elevation: 4,
    },
    containerInitialBank: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    iconActivity: {
        width: 30,
        height: 30,
        marginBottom: 8,
        marginRight: 8
    },
    walletName: {
        fontSize: 12
    },
    descActivity: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});