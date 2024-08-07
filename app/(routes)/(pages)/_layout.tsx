import {
    useNavigation,
    Redirect,
    Slot,
    Stack,
    usePathname,
    router,
} from 'expo-router';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../../components/AuthContext';
import { useContext } from 'react';
import supabase from '../../lib/supabase';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Image, ImageBackground } from 'expo-image';
const image = { uri: './app/assets/images/homescreen.jpg' };

export default function AppLayout() {
    const { session } = useContext(AuthContext);
    const pathname = usePathname();
    console.log(pathname);
    // const navigation = useNavigation();
    // console.log(navigation.getId(), navigation.getState());
    // console.log(navigation);
    console.log('pages layout session value', session);
    // console.log('pages layout session', session);

    // // You can keep the splash screen open, or render a loading screen like we do here.
    // if (session === undefined || session === null) {
    //     return <Text>Loading...</Text>;
    // }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    // if (session) {
    //     // On web, static rendering will stop here as the user is not authenticated
    //     // in the headless Node process that the pages are rendered in.
    //     return <Redirect href='/welcome' />;
    // }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    // if (!session) {
    //     // On web, static rendering will stop here as the user is not authenticated
    //     // in the headless Node process that the pages are rendered in.
    //     return <Redirect href='/login' />;
    // }

    // This layout can be deferred because it's not the root layout.
    return (
        <ThemeProvider value={DarkTheme}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
            {pathname !== '/login' && (
                <Button
                    title={'logout'}
                    onPress={() => {
                        supabase.auth.signOut();
                        router.push('/login');
                    }}
                />
            )}
        </ThemeProvider>
    );
}
