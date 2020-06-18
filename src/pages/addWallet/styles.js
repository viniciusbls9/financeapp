import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    header: {
        padding: 20,
        height: 80,
        backgroundColor: '#5c8efe',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backImage: {
        width: 25,
        height: 25,
        marginRight: 20
    },
    textHeader: {
        fontSize: 16,
        color: '#fff',
    },
    label: {
        color: '#1c2e35',
        fontSize: 15,
        marginBottom: 10,
        marginTop: 30,
        paddingBottom: 10,
    },
    fieldsWallet: {
        paddingHorizontal: 20,
    },
    typeBank: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    containerInitialBank: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textInitialBank: {
        color: '#fff'
    },
    nameBank: {
        marginVertical: 10
    },
    picker: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 20,
        marginBottom: 20
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20
    },
    containerbtnSave: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 20,
        marginBottom: 120
    },
    btnSave: {
        backgroundColor: '#ff4f5a',
        width: '90%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textBtnSave: {
        color: '#fff'
    },
});