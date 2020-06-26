import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
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
    modalBox: {
        width: width,
        height: height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // opacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBody: {
        width: '90%',
        height: '55%',
        borderRadius: 10,
        backgroundColor: '#fff',
        padding:10
    },
    btnNewCategory: {
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        // backgroundColor: '#27B635',
        borderRadius: 5,
        width: 29
    },
    textBtnSave: {
        color: '#27B635',
        fontSize: 16
    },
    info: {
        textAlign: 'center',
        fontSize: 15
    },
});