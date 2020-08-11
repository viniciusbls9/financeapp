import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
        justifyContent: 'center',
    },
    containerInput: {
        marginTop: 50,
        marginHorizontal: 20,
    },
    input: {
        borderColor: '#E1E1E1',
        borderWidth: 1,
        padding: 13,
        marginBottom: 20,
        borderRadius: 10,
        height: 50
    },
    submitBtn: {
        backgroundColor: '#27B635',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 50
    },
    textBtnSubmit: {
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    message: {
        alignItems: 'center',
        marginBottom: 10,
    }
});