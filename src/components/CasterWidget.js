import React, { useEffect, useRef } from 'react';
import { Platform, View, StyleSheet } from 'react-native';

const CasterWidget = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (Platform.OS === 'web') {
            // Inject Caster.fm widget on web
            const widgetDiv = document.createElement('div');
            widgetDiv.setAttribute('data-type', 'newStreamPlayer');
            widgetDiv.setAttribute('data-publicToken', '621e4272-86f2-404f-96fb-7ac93d822685');
            widgetDiv.setAttribute('data-theme', 'light');
            widgetDiv.setAttribute('data-color', 'e81e4d');
            widgetDiv.setAttribute('data-channelId', '');
            widgetDiv.setAttribute('data-rendered', 'false');
            widgetDiv.className = 'cstrEmbed';

            // Add fallback links
            widgetDiv.innerHTML = `
        <a href="https://www.caster.fm">Shoutcast Hosting</a>
        <a href="https://www.caster.fm">Stream Hosting</a>
        <a href="https://www.caster.fm">Radio Server Hosting</a>
      `;

            // Append to container
            if (containerRef.current) {
                containerRef.current.appendChild(widgetDiv);
            }

            // Load Caster.fm script
            const script = document.createElement('script');
            script.src = '//cdn.cloud.caster.fm//widgets/embed.js';
            script.async = true;
            document.body.appendChild(script);

            // Cleanup
            return () => {
                if (containerRef.current && widgetDiv.parentNode) {
                    containerRef.current.removeChild(widgetDiv);
                }
                if (script.parentNode) {
                    document.body.removeChild(script);
                }
            };
        }
    }, []);

    if (Platform.OS !== 'web') {
        // On mobile, return null (we use the custom player)
        return null;
    }

    return (
        <View style={styles.container}>
            <div ref={containerRef} style={{ width: '100%', maxWidth: 600 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
    },
});

export default CasterWidget;
