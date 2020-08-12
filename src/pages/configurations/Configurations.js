import React, { useState, useContext } from 'react';

import { connect } from 'react-redux';
import { Picker } from '@react-native-community/picker';

import { useNavigation, CommonActions } from '@react-navigation/native';

import dark from '../../themes/dark';
import light from '../../themes/light';

import { View, Text, Switch, ScrollView } from 'react-native';
import { ThemeContext } from 'styled-components'

function Cards(props) {

    const [isEnabled, setIsEnabled] = useState(false);
    const [picker, setPicker] = useState('Escolha seu nome');

    const navigation = useNavigation();

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        console.log(isEnabled)
    }

    const { title } = useContext(ThemeContext);

    return (
        <ScrollView>
            {/* <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onChange={e => props.setTheme(e)}
                value={isEnabled}
            /> */}

            <Picker
                selectedValue={picker}
                onValueChange={
                    e => props.setTheme(e)
                }
                value={setPicker}
                mode="dropdown"
            >
                <Picker.Item key={1} value={'Escolha seu tema'} label={'Escolha seu tema'} />
                <Picker.Item key={2} value={Object(light)} label={'light'} />
                <Picker.Item key={3} value={Object(dark)} label={'dark'} />
            </Picker>

            <Text>{JSON.stringify(props.theme)}</Text>

        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        theme: state.userReducer.theme
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTheme: (theme) => dispatch({
            type: 'SET_THEME', payload: {
                theme
            }
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);