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
        backgroundColor: '#27B635',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconMoreExpenses: {
        width: 16,
        height: 16,
        marginRight: 10
    },
    backImage: {
        width: 30,
        height: 30
    },
    textHeader: {
        fontSize: 16,
        color: '#fff',
    },
    containerInfo: {
        paddingTop: 25,
        flex: 1,
        backgroundColor: '#fff',
    },
    containerTotalExpenses: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 15,
        // marginBottom: 25
    },
    walletImage: {
        width: 28,
        height: 28
    },
    expensesTotalText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1c2e35'
    },
    expensesTotalValue: {
        fontSize: 16,
        color: '#27B635',
        fontWeight: 'bold',
    },
    modalBox: {
        width: width,
        height: height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBody: {
        width: width,
        height: height,
        marginTop: 200,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
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
    btnCancel: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    textBtnCancel: {
        fontSize: 12,
    },
});