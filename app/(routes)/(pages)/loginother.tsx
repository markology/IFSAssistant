import React, { useContext, useState } from 'react';
import { StyleSheet, Button, TextInput, View, Alert } from 'react-native';
import { AuthContext } from '../../components/AuthContext';
import supabase from '../../lib/supabase';
import ThemedText from '@/app/components/ThemedText';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const authContext = useContext(AuthContext);
    // console.log('auth context in login', authContext);

    async function signInWithEmail() {
        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        // console.log('in', session);

        if (error) Alert.alert(error.message);
        setLoading(false);
        authContext.setSession(session);
    }

    async function signUpWithEmail() {
        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        // console.log('up', session);

        if (error) Alert.alert(error.message);
        if (!session)
            Alert.alert('Please check your inbox for email verification!');
        authContext.setSession(session);
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            {/* <ThemedText ta='left' size={'header'}>
                Welcome to Your Journey of Self-Discovery!
            </ThemedText> */}
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <TextInput
                    label='Email'
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder='email@address.com'
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput
                    label='Password'
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder='Password'
                    autoCapitalize={'none'}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button
                    title='Sign in'
                    disabled={loading}
                    onPress={() => signInWithEmail()}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Button
                    title='Sign up'
                    disabled={loading}
                    onPress={() => signUpWithEmail()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
});
