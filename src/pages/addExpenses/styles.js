import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

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
    picker: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 20,
        marginBottom: 20
    },
    containerCalendar: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 20,
        marginBottom: 20
    },
    btnCalendar: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff4f5a',
        padding: 10,
        marginTop: 10, 
        width: '50%',
        borderRadius: 10
    },
    calendarImage: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    btnTextCalendar: {
        color: '#fff',
        justifyContent: 'center'
    },
    containerRemember: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 20,
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
        backgroundColor: '#27B635',
        borderRadius: 5,
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