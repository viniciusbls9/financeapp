import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, Image, FlatList, StatusBar } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import styles from './styles';
import Users from '../../assets/users.png';
import CategoryRevenueList from '../../components/categoryRevenueList/CategoryRevenueList';


export default function Profile(props) {
  const navigation = useNavigation();
  let uid = auth().currentUser.uid

  const [categoryRevenue, setCategoryRevenue] = useState([]);

  useEffect(() => {
    database().ref('finance_revenue_category')
    .child(uid)
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((item) => {
        categoryRevenue.push({
          category: item.val().category,
          key: item.key
        });
      });
      setCategoryRevenue(categoryRevenue);
    });
  }, []);

  return (
    <View style={styles.container}>

      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableHighlight underlayColor="transparent">
          <Text style={styles.textHeader}>Categorias</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.containerInfo}>

        <View style={styles.containerRevenue}>
          <Text style={styles.label}>Receita</Text>
          <FlatList
            renderItem={({ item }) => <CategoryRevenueList data={item} />}
            data={categoryRevenue}
          />
        </View>

        <View style={styles.containerExpense}>
          <Text style={styles.label}>Despesas</Text>
          <FlatList />
        </View>

      </View>

    </View>
  );
}