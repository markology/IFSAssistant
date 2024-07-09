import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Alert,
    ImageBackground,
} from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../components/AuthContext';
import supabase from '../../lib/supabase';
import ThemedText from '@/app/components/ThemedText';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const image = { uri: 'app/assets/images/homescreen.jpg' };

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const authContext = useContext(AuthContext);
    console.log('auth context in login', authContext);

    async function signInWithEmail() {
        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        console.log('in', session);

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

        console.log('up', session);

        if (error) Alert.alert(error.message);
        if (!session)
            Alert.alert('Please check your inbox for email verification!');
        authContext.setSession(session);
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <ThemedText
                style={{
                    position: 'absolute',
                    top: 0,
                    zIndex: 9999,
                    backgroundColor: '#ffffff75',
                    background:
                        'linear-gradient(to bottom, transparent -48%,black -38%, transparent 31%)',
                    width: '100%',
                    height: '100%',
                    color: 'white',
                    fontSize: 60,
                    textShadow: '#4d4d4d 2px 2px',
                    textAlign: 'center',
                    lineHeight: '47vw',
                    fontFamily: 'Playwright-Regular',
                }}
            >
                IFS Assistant
            </ThemedText>
            <ImageBackground
                style={{
                    flex: 1,
                    height: '100%',
                    maxHeight: 731,
                }}
                source={image}
            />
            {/* <ThemedText ta='left' size={'header'}>
                Welcome to Your Journey of Self-Discovery!
            </ThemedText> */}
            <View
                style={{
                    height: 140,
                    padding: 20,
                    paddingBottom: 80,
                    // paddingTop: 40,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                {/* <View>
                    <TextInput
                        label='Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder='email@address.com'
                        autoCapitalize={'none'}
                    />
                </View>
                <View>
                    <TextInput
                        label='Password'
                        leftIcon={{ type: 'font-awesome', name: 'lock' }}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholder='Password'
                        autoCapitalize={'none'}
                    />
                </View> */}
                <View style={{ marginBottom: 20 }}>
                    <Button
                        style={{
                            height: 50,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                        }}
                        labelStyle={{
                            color: 'black',
                            fontFamily: 'Playwright-Regular',
                            fontSize: 16,
                            lineHeight: 30,
                        }}
                        // title='Sign in'
                        disabled={loading}
                        onPress={() => signInWithEmail()}
                    >
                        Log In →
                    </Button>
                </View>
                <View style={styles.verticallySpaced}>
                    <Button
                        style={{
                            height: 50,
                            backgroundColor: '#26aad1',
                            justifyContent: 'center',
                        }}
                        labelStyle={{
                            color: 'white',
                            fontFamily: 'Playwright-Regular',
                            fontSize: 16,
                            lineHeight: 30,
                        }}
                        // title='Sign in'
                        disabled={loading}
                        onPress={() => signUpWithEmail()}
                    >
                        Create Account
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginTop: 40,
        // padding: 12,
        flex: 1,
        backgroundColor: '#837260',
        justifyContent: 'space-between',
    },
    verticallySpaced: {
        // paddingTop: 4,
        // paddingBottom: 4,
        // alignSelf: 'stretch',
    },
    mt20: {
        // marginTop: 20,
    },
});
