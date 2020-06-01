import React from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import HomeIcon from '../assets/home.png';
import ExpensesActive from '../assets/expenses-active.png';
import RevenueActive from '../assets/revenue-active.png';
import ExpensesIcon from '../assets/expenses.png';
import RevenueIcon from '../assets/revenue.png';
// import AddRevenue from '../pages/addRevenue/AddRevenue'

import Home from '../pages/home/Home';
import Revenue from '../pages/revenue/Revenue';
import Expenses from '../pages/expenses/Expenses';

import Sistema from '../Sistema';

const DrawerNavigation = createDrawerNavigator();

export default () => (
    <DrawerNavigation.Navigator
        drawerType="slide"
        drawerStyle={{ width: 80 }}
        drawerContentOptions={{
            activeBackgroundColor: '#f1f1f1',
        }}
    >
        <DrawerNavigation.Screen
            name="Home"
            component={Home}
            options={{
                drawerIcon: () =>
                    <Image source={HomeIcon} style={{ width: 25, height: 25, marginLeft: 5 }} />
                ,
                title: 'Principal',
            }}
        />
        <DrawerNavigation.Screen
            name="Revenue"
            component={Revenue}
            options={{
                title: 'Receitas',
                drawerIcon: ({ focused }) =>
                    <Image source={focused ? RevenueActive : RevenueIcon} style={{ width: 25, height: 25, marginLeft: 5 }} />
                ,
            }}
        />
        <DrawerNavigation.Screen name="Expenses" component={Expenses} options={{
            title: 'Despesas',
            drawerIcon: ({ focused }) =>
                <Image source={ focused ? ExpensesActive : ExpensesIcon } style={{ width: 25, height: 25, marginLeft: 5 }} />
            ,
        }} />
    </DrawerNavigation.Navigator>
);