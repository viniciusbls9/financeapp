import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, ScrollView, Linking, Share, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import UserMale from '../../assets/user-male.png';
import UserFemale from '../../assets/user-female.png';
import Mastercard from '../../assets/wallet.png';
import CreditCard from '../../assets/credit-card.png';
import Category from '../../assets/category.png';
import Settings from '../../assets/settings.png';
import Education from '../../assets/education.png';
import Star from '../../assets/star.png';
import Heart from '../../assets/heart.png';
import Logout from '../../assets/logout.png';

export default function Profile() {

  let uid = auth().currentUser.uid;
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    database().ref('finance_user')
      .child(uid)
      .once('value')
      .then((snapshot) => {
        setUserName(snapshot.val().userName);
      });
  }, [])

  useEffect(() => {
    database().ref('finance_user')
      .child(uid)
      .once('value')
      .then((snapshot) => {
        setGender(snapshot.val().gender);
      });
  }, []);

  const navigation = useNavigation();

  async function handleLogout() {
    Alert.alert(
      'Atenção',
      'Deseja realmente sair?',
      [
          {
              text: 'Sim',
              onPress: async () => { await AsyncStorage.clear(); navigation.navigate('Welcome'); },
              style: 'cancel',
          },
          {
            text: 'Não',
            onPress: () => {  },
            style: 'cancel',
          }
      ],
      { cancelable: false },
  );
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Há um tempo eu venho organizando minha vida financeira e tá sendo ótimo! Hoje eu resolvi indicar para alguns amigos, e lembrei de você. Testa lá, e me diz o que você acha. É grátis, sem compromisso. https://play.google.com/store/apps/details?id=com.myfinanceapp',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert('Não foi possível compartilhar ): Tente novamente mais tarde.');
    }
  }

  function message() {
    Alert.alert(
      'Atenção',
      'Em breve essa funcionalidade estará ativa ;)',
      [
          {
              text: 'Ok',
              onPress: () => { },
              style: 'cancel',
          },
      ],
      { cancelable: false },
  );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <View style={styles.header}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.textHeader}>Perfil</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.userInfo}>
            <Image source={gender === 'Feminino' ? UserFemale : UserMale} style={styles.userImg} />
            <Text style={styles.userName}>{userName}</Text>
            {/* <Text style={styles.typeUserAccount}>Conta Premium</Text> */}
          </View>

          <View style={styles.containerWallet}>
            <Text style={styles.WalletLabel}>Carteiras</Text>
            <TouchableHighlight style={styles.btnLabel} onPress={() => navigation.navigate('Wallet')} underlayColor="#f7f7f7">
              <>
                <Image source={Mastercard} style={styles.walletImage} />
                <Text>Contas</Text>
              </>
            </TouchableHighlight>

            <TouchableHighlight style={styles.btnLabel} onPress={() => navigation.navigate('CreditCard')} underlayColor="#f7f7f7">
              <>
                <Image source={CreditCard} style={styles.walletImage} />
                <Text>Cartões de Crédito</Text>
              </>
            </TouchableHighlight>
          </View>

          <View style={styles.containerWallet}>
            <Text style={styles.WalletLabel}>Organizações</Text>
            <TouchableHighlight style={styles.btnLabel} onPress={() => navigation.navigate('Category')} underlayColor="#f7f7f7">
              <>
                <Image source={Category} style={styles.walletImage} />
                <Text>Categorias</Text>
              </>
            </TouchableHighlight>
          </View>

          <View style={styles.containerWallet}>
            <Text style={styles.WalletLabel}>Configurações</Text>
            <TouchableHighlight style={styles.btnLabel} onPress={() => navigation.navigate('Configurations')} underlayColor="#f7f7f7">
              <>
                <Image source={Settings} style={styles.walletImage} />
                <Text>Geral</Text>
              </>
            </TouchableHighlight>
          </View>

          <View style={styles.containerWallet}>
            <Text style={styles.WalletLabel}>Outros</Text>
            <TouchableHighlight style={styles.btnLabel} onPress={message} underlayColor="#f7f7f7">
              <>
                <Image source={Education} style={styles.walletImage} />
                <Text>Educação</Text>
              </>
            </TouchableHighlight>

            <TouchableHighlight style={styles.btnLabel} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.myfinanceapp')} underlayColor="#f7f7f7">
              <>
                <Image source={Star} style={styles.walletImage} />
                <Text>Avalie</Text>
              </>
            </TouchableHighlight>

            <TouchableHighlight style={styles.btnLabel} onPress={onShare} underlayColor="#f7f7f7">
              <>
                <Image source={Heart} style={styles.walletImage} />
                <Text>Indique</Text>
              </>
            </TouchableHighlight>

            <TouchableHighlight style={styles.btnLabel} onPress={handleLogout} underlayColor="#f7f7f7">
              <>
                <Image source={Logout} style={styles.walletImage} />
                <Text>Sair</Text>
              </>
            </TouchableHighlight>
          </View>

        </View>
      </View>
    </ScrollView>
  );
}