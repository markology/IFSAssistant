import { Redirect, Stack } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { AuthContext, AuthContextValues } from '../../components/AuthContext';
import { Context, useContext } from 'react';
import supabase from '../../lib/supabase';

export default function AppLayout() {
    const { session } = useContext(AuthContext);

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (session === undefined) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    // if (!session) {
    //     // On web, static rendering will stop here as the user is not authenticated
    //     // in the headless Node process that the pages are rendered in.
    //     return <Redirect href='/login' />;
    // }

    // This layout can be deferred because it's not the root layout.
    return (
        <>
            <Stack
                screenOptions={{
                    contentStyle: { backgroundColor: 'black' },
                    headerShown: false,
                }}
            />
            <Button title={'logout'} onPress={() => supabase.auth.signOut()} />
        </>
    );
}
