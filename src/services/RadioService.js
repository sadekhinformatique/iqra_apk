import { Audio } from 'expo-av';

class RadioService {
    constructor() {
        this.sound = null;
        this.isPlaying = false;
        this.volume = 1.0;

        // Caster.fm stream URL - using the channel ID from the embed code
        this.streamUrl = 'https://stream.caster.fm/a092f64f-8e5f-4a70-ae42-0347517df896';
    }

    async initialize() {
        try {
            // Configure audio mode for playback
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

    async play() {
        try {
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
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }

    async pause() {
        try {
            if (this.sound) {
                await this.sound.pauseAsync();
                this.isPlaying = false;
            }
        } catch (error) {
            console.error('Error pausing audio:', error);
        }
    }

    async stop() {
        try {
            if (this.sound) {
                await this.sound.stopAsync();
                await this.sound.unloadAsync();
                this.sound = null;
                this.isPlaying = false;
            }
        } catch (error) {
            console.error('Error stopping audio:', error);
        }
    }

    async setVolume(volume) {
        try {
            this.volume = volume;
            if (this.sound) {
                await this.sound.setVolumeAsync(volume);
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
