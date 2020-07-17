import { StyleSheet } from 'react-native';



export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    containerContents: {
        alignItems: 'center',
    },
    containerText: {
        marginBottom: 30,
        marginTop: 30
    },
    titleRegister: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 20
    },
    containerImage: {
        marginBottom: 30
    },
    imagePreload: {
        width: 290,
        height: 290
    },
    descText: {
        textAlign: 'center',
        fontSize: 15
    },
    containerButtons: {
        marginTop: 25,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonSignUp: {
        backgroundColor: '#27B635',
        paddingHorizontal: 70,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    textBtnSignUp: {
        textTransform: 'uppercase',
        color: '#fff',
    },
    buttonSignIn: {
        fontSize: 16
    },
});