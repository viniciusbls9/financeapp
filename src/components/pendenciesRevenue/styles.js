import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerActivity: {
        flex: 1,
        // flexDirection: 'row',
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
    iconActivity: {
        width: 34,
        height: 34,
        marginBottom: 8,
        marginRight: 8
    },
    TextsActivity: {
        // marginRight: 15
    },
    titleActivity: {
        fontSize: 12,
    },
    descActivity: {
        fontSize: 18,
        color: '#27B635',
        fontWeight: 'bold',
    },
    countPendenciesRevenue: {
        backgroundColor: '#27B635',
        width:20,
        height:20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    valueActivity: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#fff'
    }
});