import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Slider from '@react-native-community/slider';
import AudioVisualizer from '../components/AudioVisualizer';
import PlayerControls from '../components/PlayerControls';
import RadioService from '../services/RadioService';
import theme from '../constants/theme';

const { width } = Dimensions.get('window');

const PlayerScreen = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1.0);
    const [shuffleEnabled, setShuffleEnabled] = useState(false);
    const [repeatEnabled, setRepeatEnabled] = useState(false);
    const [metadata, setMetadata] = useState({ title: 'RADIO IQRA BF', artist: 'En direct' });

    useEffect(() => {
        RadioService.initialize();

        // Listen for metadata changes
        const handleMetadataChange = (newMetadata) => {
            if (newMetadata) {
                setMetadata(newMetadata);
            }
        };

        RadioService.onMetadataChange(handleMetadataChange);

        return () => {
            RadioService.removeMetadataListener(handleMetadataChange);
            RadioService.stop();
        };
    }, []);

    const handlePlayPause = async () => {
        if (isPlaying) {
            await RadioService.pause();
            setIsPlaying(false);
        } else {
            await RadioService.play();
            setIsPlaying(true);
        }
    };

    const handleVolumeChange = async (value) => {
        setVolume(value);
        await RadioService.setVolume(value);
    };

    const handleShuffle = () => {
        setShuffleEnabled(!shuffleEnabled);
    };

    const handleRepeat = () => {
        setRepeatEnabled(!repeatEnabled);
    };

    return (
        <LinearGradient
            colors={['#000000', '#1a1a1a', '#000000']}
            style={styles.container}
        >
            <StatusBar style="light" />

            <View style={styles.content}>
                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoWrapper}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* Station Name and Current Song */}
                <Text style={styles.stationName}>RADIO IQRA BF</Text>
                <Text style={styles.currentSong}>{metadata.title}</Text>
                <Text style={styles.subtitle}>{metadata.artist}</Text>

                {/* Audio Visualizer */}
                <AudioVisualizer isPlaying={isPlaying} />

                {/* Volume Slider */}
                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={1}
                        value={volume}
                        onValueChange={handleVolumeChange}
                        minimumTrackTintColor={theme.colors.text}
                        maximumTrackTintColor={theme.colors.border}
                        thumbTintColor={theme.colors.text}
                    />
                </View>

                {/* Player Controls */}
                <View style={styles.controls}>
                    <PlayerControls
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                        onShuffle={handleShuffle}
                        onRepeat={handleRepeat}
                        shuffleEnabled={shuffleEnabled}
                        repeatEnabled={repeatEnabled}
                    />
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: theme.spacing.lg,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.lg,
    },
    logoWrapper: {
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 2,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.md,
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    stationName: {
        ...theme.typography.title,
        color: theme.colors.text,
        textAlign: 'center',
        marginTop: theme.spacing.lg,
    },
    currentSong: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.primary,
        textAlign: 'center',
        marginTop: theme.spacing.md,
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.xs,
    },
    sliderContainer: {
        paddingHorizontal: theme.spacing.md,
        marginVertical: theme.spacing.lg,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xxl,
    },
});

export default PlayerScreen;
