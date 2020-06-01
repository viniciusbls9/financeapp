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
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
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
        color: '#ff4f5a',
        fontWeight: 'bold',
    },
});