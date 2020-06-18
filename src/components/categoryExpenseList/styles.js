import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

export default StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderBottomColor: '#ccc',
        // borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
    },
    btns: {
        flexDirection: 'row'
    },
    iconBtns: {
        width: 18,
        height: 18,
        marginRight: 10
    },
    categoryName: {
        fontSize: 15,
        color: '#ff4f5a',
    },
    modalBox: {
        width: width,
        height: height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // opacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBody: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding:10
    },
    inputNewCategory: {
        fontSize: 21,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        padding: 10,
    },
    btnNewCategory: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        backgroundColor: '#ff4f5a',
        borderRadius: 5,
    },
    textBtnSave: {
        color: '#fff'
    },
    btnCancel: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    textBtnCancel: {
        fontSize: 12,
    },
});