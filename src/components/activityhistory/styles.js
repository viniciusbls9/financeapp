import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerActivity: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        marginRight: 20,
        marginBottom: 50,
        padding: 20,
        borderRadius: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#fff',
        elevation: 4,
    },
    containerInfo: {
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row'
    },
    iconActivity: {
        width: 34,
        height: 34,
        marginRight: 8,
    },
    TextsActivity: {
        marginRight: 15
    },
    titleActivity: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    descActivity: {
        color: '#aaa',
        fontSize: 12
    },
    valueActivity: {
        fontWeight: 'bold',
        fontSize: 12,
    }
});