import { Redirect, Stack } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { AuthContext, AuthContextValues } from '../../components/AuthContext';
import { Context, useContext } from 'react';
import supabase from '../../lib/supabase';

export default function AppLayout() {
    const { session, loading } = useContext(AuthContext);
    // console.log('app layout');

    console.warn(
        'session redirect value',
        session,
        !!session?.user.id,
        loading
    );

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (loading) {
        return <Text style={{ fontSize: 60, color: 'red' }}>Loading...</Text>;
    }

    // // Only require authentication within the (app) group's layout as users
    // // need to be able to access the (auth) group and sign in again.
    if (!session && !loading) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        console.log('redirecting to login');
        return <Redirect href='/login' />;
    }

    if (session) {
        // console.log({ session });
        console.log('redirecting to welcome');
        return <Redirect href='/welcome' />;
    }

    // This layout can be deferred because it's not the root layout.
    return (
        <>
            <Stack
                screenOptions={{
                    contentStyle: { backgroundColor: 'black' },
                    headerShown: false,
                }}
            />
        </>
    );
}
