import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Animated, Image } from 'react-native';

import styles from './styles';
import More from '../../assets/more.png';

export default function ButtonHome(props) {

    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [open, setOpen] = useState(0);
    
    function toggleMenu() {
        const toValue = open ? 0 : 1;
        
        Animated.spring(animation , {
            toValue,
            friction: 6,
            useNativeDriver: false
        }).start();
        
        setOpen(!open);
    }

    const revenue = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0,1],
                    outputRange: [0, -100]
                })
            }
        ]
    }

    const expense = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0,1],
                    outputRange: [0, -50]
                })
            }
        ]
    }
    
    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0,1],
                    outputRange: ["0deg", "45deg"]
                })
            }
        ]
    }

    return (
        <View style={[styles.containerBtn, props.style ]}>
            <TouchableWithoutFeedback>
                <Animated.View style={[styles.button, styles.subMenu, revenue]}>
                    <Image source={More} style={styles.imageBtn} />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
                <Animated.View style={[styles.button, styles.subMenu, expense]}>
                    <Image source={More} style={styles.imageBtn} />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View style={[styles.button, styles.menu, rotation]}>
                    <Image source={More} style={styles.imageBtn} />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
}