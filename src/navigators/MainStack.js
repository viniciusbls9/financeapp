import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../pages/preload/Preload';
import Welcome from '../pages/welcome/Welcome';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
// import Home from '../pages/home/Home';
import AddExpenses from '../pages/addExpenses/AddExpenses';
import AddRevenue from '../pages/addRevenue/AddRevenue';
import EditRevenue from '../pages/editRevenue/EditRevenue';
import EditExpense from '../pages/editExpense/EditExpense';
import Revenue from '../pages/revenue/Revenue';
import Expenses from '../pages/expenses/Expenses';

import DrawerNavigation from './DrawerNavigation';

const MainStack = createStackNavigator();

export default () => (
    <MainStack.Navigator>
        <MainStack.Screen name="Preload" component={Preload} options={{ headerShown: false }} />
        <MainStack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <MainStack.Screen name="Login" component={Login} />
        <MainStack.Screen name="Home" component={DrawerNavigation} options={{ headerShown: false }} />
        <MainStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <MainStack.Screen name="AddExpenses" component={AddExpenses} options={{ headerShown: false }} />
        <MainStack.Screen name="AddRevenue" component={AddRevenue} options={{ headerShown: false }} />
        <MainStack.Screen name="EditRevenue" component={EditRevenue} options={{ headerShown: false }} />
        <MainStack.Screen name="EditExpense" component={EditExpense} options={{ headerShown: false }} />
        <MainStack.Screen name="Revenue" component={Revenue} options={{ headerShown: false }} />
        <MainStack.Screen name="Expenses" component={Expenses} options={{ headerShown: false }} />
    </MainStack.Navigator>
);