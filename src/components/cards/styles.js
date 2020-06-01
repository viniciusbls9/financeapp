import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export default StyleSheet.create({
    containerCard: {
        flex: 1,
        marginTop: 20,
        marginRight: 20,
        marginBottom: 50,
        padding: 20,
        borderRadius: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        width: screenWidth - 40,
        backgroundColor: '#fff',
        elevation: 4
    },
    iconCard: {
        width: 34,
        height: 34,
        marginRight: 8,
    },
    TextsCard: {
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15
    },
    titleCard: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    descCard: {
        color: '#aaa',
        fontSize: 12,
    },
    valueCard: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#c2494d'
    },
    containerTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingTop: 15
    },
    valueTotal: {
        marginRight: 8
    },
});