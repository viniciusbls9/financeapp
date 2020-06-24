import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#27B635',
    },
    header: {
        padding: 20,
        height: 100,
        backgroundColor: '#27B635',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backRevenue: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backImage: {
        width: 25,
        height: 25,
        marginRight: 20
    },
    deleteRevenue: {
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
    containerBtnTooltip: {
        width: 20,
        marginLeft: 10,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTooltip: {
        color: '#fff',
    },
    containerTooltip: {
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 2, // <- zIndex here
        // flex: 1,
        left: 58,
        top: 30
    },
    tooltip: {
        width: 150,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tooltipTriangle: {
        position: 'absolute',
        bottom: -20,
        left: 55,
        width: 0,
        height: 0,
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderTopWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#fff',
    },
    tooltipMessage: {
        marginHorizontal: 20,
        textAlign: 'center',
        fontSize: 12
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
        backgroundColor: '#24822e',
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
        backgroundColor: '#27B635',
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