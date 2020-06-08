import React, { useState } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native';

import Arrow from '../../assets/arrows.png';
import styles from './styles';

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={Arrow} style={styles.iconMoreExpenses} />
          <Text style={styles.textHeader}>Perfil</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}