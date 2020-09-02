import { createStore } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import Reducers from './reducers/index';

const persistedReducer = persistReducer({
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userReducer'],
}, Reducers);

const store = createStore(persistedReducer);

let persistor = persistStore(store);

export { store, persistor };