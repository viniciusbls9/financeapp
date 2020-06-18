import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        borderRadius: 15,
        padding: 15,
        backgroundColor: '#fff',
        elevation: 4,
        marginHorizontal: 20,
        marginTop: 12,
    },
    containerIcon: {
        backgroundColor: '#27B635',
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        height: 45,
        marginRight: 10,
        borderRadius: 25
    },
    iconRevenue: {
        width: 25,
        height: 25,
        // marginTop:5
    },
    descRevenue: {
        fontWeight: '700'
    },
    catRevenue: {
        fontSize: 13,
        color: '#848181'
    },
    dateRevenue: {
        fontSize: 13,
        color: '#848181'
    },
    dateRemember: {
        color: '#27B635',
        fontWeight: 'bold'
    },
    infoValueRevenue: {
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    valueRevenue: {
        color: '#27B635',
        fontWeight: 'bold',
    },
    iconPay: {
        width:15,
        height: 15,
        marginTop: 10,
    },
});