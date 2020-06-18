import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5c8efe',
    },
    header: {
        padding: 20,
        height: 100,
        backgroundColor: '#5c8efe',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    containerInfo: {
        paddingTop: 25,
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    label: {
        color: '#1c2e35',
        fontSize: 15,
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    containerRevenue: {
        marginBottom: 15,
        paddingBottom: 10
    },
    containerExpense: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 15,
        marginTop: 25
    },
});