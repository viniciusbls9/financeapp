import React, { useState, useContext } from 'react';
import { View, Text, Switch } from 'react-native';
import { ThemeContext } from 'styled-components'

import styles from './styles';

export default function Cards({ toggleTheme }) {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    }

    const { title } = useContext(ThemeContext);

    return (
        <View>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onChange={toggleTheme}
                value={title === 'dark'}
            />
        </View>
    );
}