import { Slot } from 'expo-router';
import AuthProvider from './components/AuthContext';
import { ImageBackground, View } from 'react-native';
import { ThemeProvider } from './components/ThemeContext';
import { Image } from 'expo-image';

export default function RootLayout() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Slot />
            </ThemeProvider>
        </AuthProvider>
    );
}
