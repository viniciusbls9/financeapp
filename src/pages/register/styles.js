import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    containerRegisterImage: {
        // justifyContent: 'flex-end',
        alignItems: 'center',
    },
    registerImage: {
        width: 350,
        height: 466
    },
    titleRegister: {
        marginTop: 50,
        textAlign: 'center',
        fontSize: 20,
        marginHorizontal: 20
    },
    containerInput: {
        marginTop: 50,
        marginHorizontal: 20
    },
    input: {
        borderColor: '#E1E1E1',
        borderWidth: 1,
        padding: 13,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    submitBtn: {
        backgroundColor: '#ff4f5a',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textBtnSubmit: {
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    registerBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    textBtnRegister: {
        color: '#ff4f5a',
        fontWeight: 'bold'
    }
});