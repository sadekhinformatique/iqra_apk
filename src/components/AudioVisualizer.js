import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import theme from '../constants/theme';

const AudioVisualizer = ({ isPlaying }) => {
    const bars = Array(30).fill(0);
    const animatedValues = useRef(bars.map(() => new Animated.Value(0.2))).current;

    useEffect(() => {
        if (isPlaying) {
            const animations = animatedValues.map((animatedValue, index) => {
                return Animated.loop(
                    Animated.sequence([
                        Animated.timing(animatedValue, {
                            toValue: Math.random() * 0.8 + 0.2,
                            duration: 300 + Math.random() * 200,
                            useNativeDriver: false,
                        }),
                        Animated.timing(animatedValue, {
                            toValue: Math.random() * 0.8 + 0.2,
                            duration: 300 + Math.random() * 200,
                            useNativeDriver: false,
                        }),
                    ])
                );
            });

            animations.forEach((animation, index) => {
                setTimeout(() => animation.start(), index * 30);
            });

            return () => {
                animations.forEach(animation => animation.stop());
            };
        } else {
            animatedValues.forEach(animatedValue => {
                Animated.timing(animatedValue, {
                    toValue: 0.2,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            });
        }
    }, [isPlaying]);

    return (
        <View style={styles.container}>
            {animatedValues.map((animatedValue, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.bar,
                        {
                            height: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['20%', '100%'],
                            }),
                        },
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 120,
        paddingHorizontal: theme.spacing.md,
        marginVertical: theme.spacing.xl,
    },
    bar: {
        width: 3,
        backgroundColor: theme.colors.text,
        borderRadius: 2,
        opacity: 0.8,
    },
});

export default AudioVisualizer;
