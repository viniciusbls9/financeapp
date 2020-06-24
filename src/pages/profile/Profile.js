import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import Users from '../../assets/users.png';
import UserWallet from '../../components/userWallet/UserWallet';
import Mastercard from '../../assets/mastercard.png';
import Cards from '../../components/cards';

export default function Profile() {

  const [userName, setUserName] = useState('');

  useEffect(() => {
    let uid = auth().currentUser.uid;
    database().ref('finance_user')
      .child(uid)
      .once('value')
      .then((snapshot) => {
        setUserName(snapshot.val().userName);
      });
  }, [])

  const navigation = useNavigation();

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Welcome');
  }

  const [wallet, setWallet] = useState([
    { key: '1', name: 'Conta Corrente Nubank', value: 10055.05 },
    { key: '2', name: 'Poupança', value: 10055.05 },
    { key: '3', name: 'Investimento', value: -15 },
  ]);

  const [cards, setCards] = useState([
    { key: '1', flag: Mastercard, nameCard: 'Nubank', closeDate: '12/jun', value: 250, valueTotal: 250 },
  ]);

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.textHeader}>Perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        <Image source={Users} style={styles.userImg} />
        <Text style={styles.userName}>{userName}</Text>
        {/* <Text style={styles.typeUserAccount}>Conta Premium</Text> */}
      </View>

      <View style={styles.containerBtns}>
        <TouchableHighlight style={styles.btn} underlayColor="#ccc" onPress={() => navigation.navigate('Category')}>
          <Text style={styles.textBtn}>Minhas Categorias</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.btn} underlayColor="#ccc" onPress={() => navigation.navigate('Wallet')}>
          <Text style={styles.textBtn}>Minhas Carteiras</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.btn} underlayColor="#ccc">
          <Text style={styles.textBtn}>Meus Cartões</Text>
        </TouchableHighlight>

      </View>

      {/* <PieChart
        data={data}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        // paddingLeft="15"
        absolute
      /> */}

      <TouchableOpacity onPress={handleLogout} style={styles.btnLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}