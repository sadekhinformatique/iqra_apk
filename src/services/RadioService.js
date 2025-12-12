import { Platform } from 'react-native';
import { Audio } from 'expo-av';

class RadioService {
    constructor() {
        this.sound = null;
        this.audioElement = null; // For web
        this.isPlaying = false;
        this.volume = 1.0;

        // Caster.fm stream URL - using the channel ID from the embed code
        this.streamUrl = 'https://stream.caster.fm/a092f64f-8e5f-4a70-ae42-0347517df896';
    }

    async initialize() {
        if (Platform.OS === 'web') {
            // Web: Create HTML5 Audio element
            this.audioElement = new window.Audio(this.streamUrl);
            this.audioElement.volume = this.volume;
            this.audioElement.addEventListener('play', () => {
                this.isPlaying = true;
            });
            this.audioElement.addEventListener('pause', () => {
                this.isPlaying = false;
            });
        } else {
            // Mobile: Configure expo-av
            try {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                    staysActiveInBackground: true,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    playThroughEarpieceAndroid: false,
                });
            } catch (error) {
                console.error('Error initializing audio:', error);
            }
        }
    }

    async play() {
        try {
            if (Platform.OS === 'web') {
                // Web: Use HTML5 Audio
                if (this.audioElement) {
                    await this.audioElement.play();
                    this.isPlaying = true;
                }
            } else {
                // Mobile: Use expo-av
                if (this.sound) {
                    await this.sound.playAsync();
                    this.isPlaying = true;
                } else {
                    const { sound } = await Audio.Sound.createAsync(
                        { uri: this.streamUrl },
                        { shouldPlay: true, volume: this.volume },
                        this.onPlaybackStatusUpdate
                    );
                    this.sound = sound;
                    this.isPlaying = true;
                }
            }
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }

    async pause() {
        try {
            if (Platform.OS === 'web') {
                // Web: Pause HTML5 Audio
                if (this.audioElement) {
                    this.audioElement.pause();
                    this.isPlaying = false;
                }
            } else {
                // Mobile: Pause expo-av
                if (this.sound) {
                    await this.sound.pauseAsync();
                    this.isPlaying = false;
                }
            }
        } catch (error) {
            console.error('Error pausing audio:', error);
        }
    }

    async stop() {
        try {
            if (Platform.OS === 'web') {
                // Web: Stop and reset HTML5 Audio
                if (this.audioElement) {
                    this.audioElement.pause();
                    this.audioElement.currentTime = 0;
                    this.isPlaying = false;
                }
            } else {
                // Mobile: Stop expo-av
                if (this.sound) {
                    await this.sound.stopAsync();
                    await this.sound.unloadAsync();
                    this.sound = null;
                    this.isPlaying = false;
                }
            }
        } catch (error) {
            console.error('Error stopping audio:', error);
        }
    }

    async setVolume(volume) {
        try {
            this.volume = volume;
            if (Platform.OS === 'web') {
                // Web: Set HTML5 Audio volume
                if (this.audioElement) {
                    this.audioElement.volume = volume;
                }
            } else {
                // Mobile: Set expo-av volume
                if (this.sound) {
                    await this.sound.setVolumeAsync(volume);
                }
            }
        } catch (error) {
            console.error('Error setting volume:', error);
        }
    }

    onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            this.isPlaying = status.isPlaying;
        }
    };

    getPlaybackStatus() {
        return this.isPlaying;
    }
}

export default new RadioService();
