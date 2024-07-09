// ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { theme, components } from '../lib/theme';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const ThemeContext = createContext({ theme, components });
const loadFonts = () => {
    return Font.loadAsync({
        'Raleway-Light': require('./../assets/fonts/Raleway-Light.ttf'),
        'Raleway-Regular': require('./../assets/fonts/Raleway-Regular.ttf'),
        'Raleway-SemiBold': require('./../assets/fonts/Raleway-SemiBold.ttf'),
        'Raleway-Bold': require('./../assets/fonts/Raleway-Bold.ttf'),
        'Playwright-Regular': require('./../assets/fonts/PlaywriteGBS-Regular.ttf'),
        'Playwright-Thin': require('./../assets/fonts/PlaywriteGBS-Thin.ttf'),
        'Playwright-Light': require('./../assets/fonts/PlaywriteGBS-Light.ttf'),
        'Playwright-ExtraLight': require('./../assets/fonts/PlaywriteGBS-ExtraLight.ttf'),
    });
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function load() {
            await loadFonts();
            setFontsLoaded(true);
        }
        load();
    }, []);

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <ThemeContext.Provider value={{ theme, components }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};
