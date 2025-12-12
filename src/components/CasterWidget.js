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
            widgetDiv.setAttribute('data-color', '0BA540');
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

            script.onload = () => {
                // After widget loads, customize it
                setTimeout(() => {
                    customizeWidget();
                }, 1000);
            };

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

    const customizeWidget = () => {
        if (typeof document === 'undefined') return;

        // Add custom CSS to hide Caster.fm logo and add IQRA logo
        const style = document.createElement('style');
        style.innerHTML = `
      /* Hide Caster.fm branding */
      .cstrEmbed a[href*="caster.fm"],
      .cstrEmbed img[alt*="caster"],
      .cstrEmbed .caster-logo,
      .cstrEmbed [class*="logo"]:not(.iqra-logo),
      .cstrEmbed [class*="branding"] {
        display: none !important;
        visibility: hidden !important;
      }

      /* Center the widget */
      .cstrEmbed {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin: 0 auto !important;
        max-width: 600px !important;
        position: relative !important;
      }

      /* Add smaller IQRA logo on top of widget */
      .cstrEmbed::before {
        content: '';
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 80px;
        background-image: url('/assets/logo.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        z-index: 1000;
        pointer-events: none;
      }
    `;
        document.head.appendChild(style);
    };

    if (Platform.OS !== 'web') {
        // On mobile, return null (we use the custom player)
        return null;
    }

    return (
        <View style={styles.container}>
            <div ref={containerRef} style={{ width: '100%', maxWidth: 600, position: 'relative' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});

export default CasterWidget;
