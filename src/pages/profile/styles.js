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
    containerBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 35
    },
    btn: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        padding:5,
        // marginRight: 30,
    },
    labelinfoActivity: {
        fontWeight: 'bold'
    },
    userWallet: {
        paddingHorizontal: 20,
        marginTop: 50,
    },
    userCards: {
        paddingHorizontal: 20
    },
});