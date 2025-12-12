import { Platform } from 'react-native';
import { Audio } from 'expo-av';

class RadioService {
    constructor() {
        this.sound = null;
        this.audioElement = null; // For web
        this.isPlaying = false;
        this.volume = 1.0;
        this.currentMetadata = null;
        this.metadataListeners = [];

        // Caster.fm configuration
        this.publicToken = '621e4272-86f2-404f-96fb-7ac93d822685';
        this.channelId = 'a092f64f-8e5f-4a70-ae42-0347517df896';
        this.streamUrl = `https://stream.caster.fm/${this.channelId}`;
        this.metadataUrl = `https://api.caster.fm/v1/channels/${this.channelId}/now-playing`;
    }

    async initialize() {
        if (Platform.OS === 'web') {
            // Web: Create HTML5 Audio element
            this.audioElement = new window.Audio(this.streamUrl);
            this.audioElement.volume = this.volume;
            this.audioElement.addEventListener('play', () => {
                this.isPlaying = true;
                this.startMetadataPolling();
            });
            this.audioElement.addEventListener('pause', () => {
                this.isPlaying = false;
                this.stopMetadataPolling();
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

    async fetchMetadata() {
        try {
            const response = await fetch(this.metadataUrl, {
                headers: {
                    'Authorization': `Bearer ${this.publicToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.currentMetadata = {
                    title: data.title || 'RADIO IQRA BF',
                    artist: data.artist || 'En direct',
                    artwork: data.artwork || null
                };
                this.notifyMetadataListeners();
            }
        } catch (error) {
            console.error('Error fetching metadata:', error);
            this.currentMetadata = {
                title: 'RADIO IQRA BF',
                artist: 'En direct',
                artwork: null
            };
        }
    }

    startMetadataPolling() {
        // Fetch immediately
        this.fetchMetadata();

        // Then fetch every 10 seconds
        this.metadataInterval = setInterval(() => {
            this.fetchMetadata();
        }, 10000);
    }

    stopMetadataPolling() {
        if (this.metadataInterval) {
            clearInterval(this.metadataInterval);
            this.metadataInterval = null;
        }
    }

    onMetadataChange(callback) {
        this.metadataListeners.push(callback);
        // Call immediately with current metadata
        if (this.currentMetadata) {
            callback(this.currentMetadata);
        }
    }

    removeMetadataListener(callback) {
        this.metadataListeners = this.metadataListeners.filter(cb => cb !== callback);
    }

    notifyMetadataListeners() {
        this.metadataListeners.forEach(callback => {
            callback(this.currentMetadata);
        });
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
                // Start metadata polling for mobile too
                this.startMetadataPolling();
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
                this.stopMetadataPolling();
            }
        } catch (error) {
            console.error('Error pausing audio:', error);
        }
    }

    async stop() {
        try {
            this.stopMetadataPolling();

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

    getCurrentMetadata() {
        return this.currentMetadata;
    }
}

export default new RadioService();
