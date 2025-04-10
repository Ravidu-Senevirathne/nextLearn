"use client";

import React, { useEffect, useState } from 'react';

/**
 * ChatbotSupport - Integrates Botpress AI chatbot into the application
 */
const ChatbotSupport: React.FC = () => {
    // Simplified theme detection without using the context
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    // Detect theme from localStorage or data-theme attribute
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Get stored theme from localStorage or use system preference
            const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' ||
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

            setTheme(storedTheme);

            // Listen for theme changes
            const observer = new MutationObserver(() => {
                const dataTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
                if (dataTheme) {
                    setTheme(dataTheme);
                }
            });

            observer.observe(document.documentElement, { attributes: true });

            return () => observer.disconnect();
        }
    }, []);

    useEffect(() => {
        // Load Botpress webchat script
        const loadBotpressScript = () => {
            const injectScript = document.createElement('script');
            injectScript.src = 'https://cdn.botpress.cloud/webchat/v2.3/inject.js';
            injectScript.async = true;
            document.body.appendChild(injectScript);

            injectScript.onload = () => {
                // Load configuration script after the main script is loaded
                const configScript = document.createElement('script');
                configScript.src = 'https://files.bpcontent.cloud/2025/04/09/17/20250409171647-DCYXDDGO.js';
                configScript.async = true;
                document.body.appendChild(configScript);
            };
        };

        // Ensure the script is loaded only on the client-side
        if (typeof window !== 'undefined') {
            loadBotpressScript();
        }

        // Cleanup function to remove scripts on component unmount
        return () => {
            const scripts = document.querySelectorAll('script');
            scripts.forEach((script) => {
                if (
                    script.src.includes('botpress.cloud/webchat') ||
                    script.src.includes('bpcontent.cloud')
                ) {
                    document.body.removeChild(script);
                }
            });
        };
    }, []);

    // Apply theme-specific styling to the webchat container if needed
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // This will run when the theme changes
            const observer = new MutationObserver(() => {
                const chatWindow = document.querySelector('.bp-widget-web');
                if (chatWindow) {
                    // Apply theme-specific styles to the chatbot
                    if (theme === 'dark') {
                        chatWindow.classList.add('dark-theme-chat');
                    } else {
                        chatWindow.classList.remove('dark-theme-chat');
                    }
                }
            });

            // Start observing the document body for changes
            observer.observe(document.body, { childList: true, subtree: true });

            return () => observer.disconnect();
        }
    }, [theme]);

    return null; // This component doesn't render anything visible
};

export default ChatbotSupport;
