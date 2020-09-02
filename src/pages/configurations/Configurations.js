import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import TouchID from 'react-native-touch-id';


import dark from '../../themes/dark';
import light from '../../themes/light';

import Theme from '../../assets/theme.png';
import ThemeGrey from '../../assets/theme-grey.png';
import Biometric from '../../assets/biometric.png';
import BiometricGrey from '../../assets/biometric-grey.png';

import { Container, Header, TouchableHeader, TextHeader, ContainerPicker, ThemeIcon } from './styles';

function Cards(props) {
    const [theme, setTheme] = useState('');
    const [touchID, setTouchID] = useState('');
    const [supported, setSupported] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        TouchID.isSupported().then(success => {
            setSupported(true);
        })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <Container>
            <Header>
                <TouchableHeader onPress={() => navigation.navigate('Profile')} underlayColor="#transparent">
                    <TextHeader>Configuração</TextHeader>
                </TouchableHeader>
            </Header>

            <ContainerPicker>
                <ThemeIcon source={props.theme.title == 'light' ? Theme : ThemeGrey} />
                <Picker
                    selectedValue={theme}
                    onValueChange={
                        e => props.setTheme(e)
                    }
                    value={setTheme}
                    style={{ color: props.theme.descCard, width: '90%' }}
                    mode="dialog"
                >
                    <Picker.Item key={1} value={'Escolha seu tema'} label={'Escolha seu tema'} />
                    <Picker.Item key={2} value={Object(light)} label={'light'} />
                    <Picker.Item key={3} value={Object(dark)} label={'dark'} />
                </Picker>
            </ContainerPicker>

            {supported === true &&
                <ContainerPicker>
                    <ThemeIcon source={props.theme.title == 'light' ? Biometric : BiometricGrey} />
                    <Picker
                        selectedValue={touchID}
                        onValueChange={
                            e => props.setTouchID(e)
                        }
                        value={setTouchID}
                        style={{ color: props.theme.descCard, width: '90%' }}
                        mode="dialog"
                    >
                        <Picker.Item key={1} value={'Escolha seu tema'} label={'Touch ID'} />
                        <Picker.Item key={2} value={true} label={'Sim'} />
                        <Picker.Item key={3} value={false} label={'Não'} />
                    </Picker>
                </ContainerPicker>
            }
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.userReducer.theme,
        touchID: state.userReducer.touchID,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTheme: (theme) => dispatch({
            type: 'SET_THEME', payload: {
                theme
            },
        }),
        setTouchID: (touchID) => dispatch({
            type: 'SET_TOUCHID', payload: {
                touchID
            },
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);