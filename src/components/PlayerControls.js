import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../constants/theme';

const PlayerControls = ({ isPlaying, onPlayPause, onShuffle, onRepeat, shuffleEnabled, repeatEnabled }) => {
    return (
        <>
            <TouchableOpacity
                style={styles.controlButton}
                onPress={onShuffle}
            >
                <Ionicons
                    name="shuffle"
                    size={24}
                    color={shuffleEnabled ? theme.colors.primary : theme.colors.text}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.controlButton}
                disabled
            >
                <Ionicons
                    name="play-skip-back"
                    size={32}
                    color={theme.colors.textSecondary}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.controlButton, styles.playButton]}
                onPress={onPlayPause}
            >
                <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={40}
                    color={theme.colors.text}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.controlButton}
                disabled
            >
                <Ionicons
                    name="play-skip-forward"
                    size={32}
                    color={theme.colors.textSecondary}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.controlButton}
                onPress={onRepeat}
            >
                <Ionicons
                    name="repeat"
                    size={24}
                    color={repeatEnabled ? theme.colors.primary : theme.colors.text}
                />
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    controlButton: {
        padding: theme.spacing.sm,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        backgroundColor: theme.colors.surface,
        borderRadius: 40,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: theme.spacing.md,
    },
});

export default PlayerControls;
