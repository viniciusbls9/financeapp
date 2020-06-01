import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ff4f5a',
    },
    header: {
        padding: 20,
        height: 100,
        backgroundColor: '#ff4f5a',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backExpense: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backImage: {
        width: 25,
        height: 25,
        marginRight: 20
    },
    deleteExpense: {
        width: 25,
        height: 25,
    },
    textHeader: {
        fontSize: 16,
        color: '#fff',
    },
    containerInputValue: {
        paddingHorizontal: 20
    },
    labelFormValue: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 13
    },
    inputValue: {
        color: '#fff',
        fontSize: 30,
    },
    containerInputs: {
        paddingTop: 30,
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    containerSwitch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 20,
        marginBottom: 20
    },
    labelSwitch: {
        fontSize: 20,
        color: '#1c2e35'
    },
    labelInputs: {
        color: '#1c2e35'
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20
    },
    containerbtnSave: {
        alignItems: 'center',
        marginTop: 100,
    },
    btnSave: {
        backgroundColor: '#ff4f5a',
        width: 60,
        height:60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    textBtnSave: {
        color: '#fff'
    },
});