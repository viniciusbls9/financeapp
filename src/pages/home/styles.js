import { StyleSheet } from 'react-native';
import { StatusBar, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    header: {
        paddingTop: StatusBar.currentHeight + 10,
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        height: undefined,
        paddingBottom: 20,
        marginBottom: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 4
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20
    },
    bars: {
        width: 25,
        height: 25,
    },
    users: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    labelInfoMoney: {
        color: '#1c2e35',
        fontSize: 15,
        marginBottom: 10
    },
    infoMoney: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addMoneyIcon: {
        width: 15,
        height: 15
    },
    addMoneyText: {
        color: '#1c2e35',
        marginLeft: 10,
    },
    totalMoney: {
        color: '#1c2e35',
        fontSize: 30
    },
    pendencies: {
        width: screenWidth,
    },
    infoActivity: {
        paddingHorizontal: 20,
    },
    labelinfoActivity: {
        color: '#1c2e35',
        fontWeight: 'bold',
        fontSize: 15,
    },
    containerChart: {
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 20,
    },
});