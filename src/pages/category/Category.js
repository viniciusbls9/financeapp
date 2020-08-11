import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, FlatList, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import CategoryRevenueList from '../../components/categoryRevenueList/CategoryRevenueList';
import CategoryExpenseList from '../../components/categoryExpenseList/CategoryExpenseList';
import Arrow from '../../assets/arrows.png';

export default function Category() {
  const navigation = useNavigation();
  let uid = auth().currentUser.uid

  const [categoryRevenue, setCategoryRevenue] = useState([]);
  const [categoryExpense, setCategoryExpense] = useState([]);

  useEffect(() => {
    database().ref('finance_revenue_category')
      .child(uid)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((revenue) => {
          categoryRevenue.push({
            category: revenue.val().category,
            key: revenue.key
          });
        });
      });
  }, [categoryRevenue]);

  useEffect(() => {
    database().ref('finance_expense_category')
      .child(uid)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((expense) => {
          categoryExpense.push({
            category: expense.val().category,
            key: expense.key
          });
        });
      });
  }, [categoryExpense]);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableHighlight underlayColor="transparent" style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('Profile')}>
          <>
            <Image source={Arrow} style={styles.backImage} />
            <Text style={styles.textHeader}>Categorias</Text>
          </>
        </TouchableHighlight>
      </View>

      <View style={styles.containerInfo}>

        <Text style={styles.label}>Receita</Text>
        <FlatList
          // style={styles.containerRevenue}
          data={categoryRevenue}
          renderItem={({ item }) => <CategoryRevenueList data={item} />}
        />

        <Text style={styles.label}>Despesas</Text>
        <FlatList
          style={styles.containerRevenue}
          data={categoryExpense}
          renderItem={({ item }) => <CategoryExpenseList data={item} />}
        />

      </View>

    </View>
  );
}