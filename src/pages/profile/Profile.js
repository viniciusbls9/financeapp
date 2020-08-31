import React, { useState, useEffect } from 'react';
import { Linking, Share, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { connect } from 'react-redux';

import { Scroll, Container, ContainerFlex, Header, TextHeader, TouchableHeader, UserInfo, UserImg, UserName, ContainerWallet, WalletLabel, BtnWallet, WalletImg, TextWallet } from './styles';

import UserMale from '../../assets/user-male.png';
import UserFemale from '../../assets/user-female.png';
// ICONS LIGHT
import Mastercard from '../../assets/wallet.png';
import CreditCard from '../../assets/credit-card.png';
import Category from '../../assets/category.png';
import Settings from '../../assets/settings.png';
import Education from '../../assets/education.png';
import Star from '../../assets/star.png';
import Heart from '../../assets/heart.png';
import Logout from '../../assets/logout.png';

// ICONS DARK
import WalletGrey from '../../assets/wallet-grey.png';
import CreditCardGrey from '../../assets/credit-card-grey.png';
import CategoryGrey from '../../assets/category-grey.png';
import SettingsGrey from '../../assets/settings-grey.png';
import EducationGrey from '../../assets/education-grey.png';
import StarGrey from '../../assets/star-grey.png';
import HeartGrey from '../../assets/heart-grey.png';
import Logoutgrey from '../../assets/logout-grey.png';

function Profile(props) {

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
          onPress: () => { },
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
    <Scroll>
      <Container>
        <ContainerFlex>
          <Header>
            <TouchableHeader onPress={() => navigation.navigate('Home')} underlayColor="#transparent">
              <TextHeader>Perfil</TextHeader>
            </TouchableHeader>
          </Header>

          <UserInfo>
            <UserImg source={gender === 'Feminino' ? UserFemale : UserMale} />
            <UserName>{userName}</UserName>
          </UserInfo>

          <ContainerWallet>
            <WalletLabel>Carteiras</WalletLabel>
            <BtnWallet onPress={() => navigation.navigate('Wallet')} underlayColor="#transparent">
              <>
                <WalletImg source={props.theme.title == 'light' ? Mastercard : WalletGrey} />
                <TextWallet>Contas</TextWallet>
              </>
            </BtnWallet>

            <BtnWallet onPress={message} underlayColor="#transparent">
              <>
                <WalletImg source={props.theme.title == 'light' ? CreditCard : CreditCardGrey} />
                <TextWallet>Cartões de crédito</TextWallet>
              </>
            </BtnWallet>
          </ContainerWallet>

          <ContainerWallet>
            <WalletLabel>Organizações</WalletLabel>
            <BtnWallet onPress={() => navigation.navigate('Category')} underlayColor="#transparent">
              <>
                <WalletImg source={props.theme.title == 'light' ? Category : CategoryGrey} />
                <TextWallet>Categorias</TextWallet>
              </>
            </BtnWallet>
          </ContainerWallet>

          <ContainerWallet>
            <WalletLabel>Configurações</WalletLabel>
            <BtnWallet onPress={() => navigation.navigate('Configurations')} underlayColor="#transparent">
              <>
                <WalletImg source={props.theme.title == 'light' ? Settings : SettingsGrey} />
                <TextWallet>Geral</TextWallet>
              </>
            </BtnWallet>
          </ContainerWallet>

          <ContainerWallet>
            <WalletLabel>Outros</WalletLabel>
            <BtnWallet onPress={message} underlayColor="#transparent">
              <>
                <WalletImg source={props.theme.title == 'light' ? Education : EducationGrey} />
                <TextWallet>Educação</TextWallet>
              </>
            </BtnWallet>

            <BtnWallet onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.myfinanceapp')} underlayColor="#transparent">
              <>
                <WalletImg source={props.theme.title == 'light' ? Star : StarGrey} />
                <TextWallet>Avaliar</TextWallet>
              </>
            </BtnWallet>

            <BtnWallet onPress={onShare} underlayColor="#transparent">
              <>
                <WalletImg source={props.theme.title == 'light' ? Heart : HeartGrey} />
                <TextWallet>Indique</TextWallet>
              </>
            </BtnWallet>

            <BtnWallet onPress={handleLogout} underlayColor="#transparent">
              <>
                <WalletImg source={props.theme.title == 'light' ? Logout : Logoutgrey} />
                <TextWallet>Sair</TextWallet>
              </>
            </BtnWallet>
          </ContainerWallet>
        </ContainerFlex>
      </Container>
    </Scroll>
  );
}

const mapStateToProps = (state) => {
  return {
      theme: state.userReducer.theme
  };
}

export default connect(mapStateToProps)(Profile);