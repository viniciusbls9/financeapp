import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import TouchID from 'react-native-touch-id';

import { connect } from 'react-redux';

import { Container, Load, TextPreload } from './styles';

function Preload(props) {
    const navigation = useNavigation();
    const [supported, setSupported] = useState(null);

    useEffect(() => {
        TouchID.isSupported().then(success => {
            setSupported(true);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    // function handleLogin() {
    //     const configs = {
    //         title: 'Autenticação Touch ID',
    //         color: '#ff0000',
    //         sensorErrorDescription: 'Touch ID invalido',
    //     };
    //     TouchID.authenticate('Login Financeapp', configs)
    //     .then(success => {
    //         navigation.navigate('Home');
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // }

    AsyncStorage.getItem('@password').then(password => {
        if (password && supported && props.touchID) {
            const configs = {
                title: 'Autenticação Touch ID',
                color: '#ff0000',
                sensorErrorDescription: 'Touch ID invalido',
            };
            TouchID.authenticate('Login Financeapp', configs)
            .then(success => {
                if(success) {
                    navigation.navigate('Home');
                }
            })
            .catch(error => {
                navigation.navigate('Welcome');
            });
        } else if(password && supported == null && props.touchID == false) {
            navigation.navigate('Home');
        } else if(password == false) {
            navigation.navigate('Welcome');
        }
    });

    return (
        <Container>
            <Load size="large" color="#27B635" />
            <TextPreload>Carregando dados...</TextPreload>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.userReducer.theme,
        touchID: state.userReducer.touchID
    };
}

export default connect(mapStateToProps)(Preload);