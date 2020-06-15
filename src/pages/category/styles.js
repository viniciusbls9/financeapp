import { StyleSheet } from 'react-native';

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
        marginBottom: 10
    },
    containerRevenue: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 15,
    },
    containerExpense: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 15,
        marginTop: 25
    },
});