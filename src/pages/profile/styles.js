import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        backgroundColor: '#f7f7f7',
        flex:2,
        padding: 20
    },
    header: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textHeader: {
        fontSize: 16,
        color: '#1c2e35',
    },
    userInfo: {
        alignItems: 'center',
    },
    userImg: {
        width: 60,
        height: 60,
    },
    userName: {
        color: '#1c2e35',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10,
    },
    typeUserAccount: {
        color: '#1c2e35',
        fontSize: 12
    },
    containerWallet: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 20,
        elevation: 2,
        borderRadius: 25
    },
    WalletLabel: {
        marginBottom: 10
    },
    btnLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 6
    },
    walletImage: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    btnLogout: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 20,
        marginBottom: 10,
        padding: 5
    },
});