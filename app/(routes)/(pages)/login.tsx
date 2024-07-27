import React, { useContext, useState } from 'react';
import { StyleSheet, View, Alert, ImageBackground } from 'react-native';
import { TextInput, Modal, Text, Button } from 'react-native-paper';
import { AuthContext } from '../../components/AuthContext';
import supabase from '../../lib/supabase';
import ThemedText from '@/app/components/ThemedText';
import { router } from 'expo-router';
const image = { uri: 'app/assets/images/homescreen.jpg' };

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newUserModal, setNewUserModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const authContext = useContext(AuthContext);

    const showModal = () => setNewUserModal(true);
    const hideModal = () => setNewUserModal(false);

    async function signInWithEmail() {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        // console.log({ data, error });

        if (error?.message === 'Invalid login credentials') {
            let { data: accountData, error: accountCheckError } =
                await supabase.rpc('get_user_id_by_email', {
                    email,
                });

            setLoading(false);
            if (accountData.length === 0) {
                console.log('CREATING NEW USER');
                showModal();
            } else {
                console.log(data, 'INVALID PASSWORD');
            }
        }

        if (!data?.session) return;
        authContext.setSession(data.session);
        router.push('/welcome');
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
        if (error) Alert.alert(error.message);
        authContext.setSession(session);
        setLoading(false);
        router.push('/welcome');
    }

    return (
        <>
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
                        pointerEvents: 'none',
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
                <View
                    style={{
                        height: 140,
                        padding: 40,
                        paddingTop: 0,

                        paddingBottom: 90,
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <>
                        <View style={{ marginBottom: 20 }}>
                            <TextInput
                                style={{
                                    height: 40,
                                    backgroundColor: '#ffffff61',
                                }}
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                                textColor='white'
                                contentStyle={{
                                    fontFamily: 'Playwright-Regular',
                                }}
                                placeholderTextColor={'white'}
                                activeUnderlineColor='white'
                                underlineColor='white'
                                placeholder='Email'
                                autoCapitalize={'none'}
                                underlineStyle={{
                                    borderWidth: 1,
                                    borderColor: 'white',
                                }}
                            />
                        </View>
                        <View>
                            <TextInput
                                style={{
                                    height: 40,
                                    backgroundColor: '#ffffff61',
                                }}
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                                secureTextEntry={true}
                                textColor='white'
                                contentStyle={{
                                    fontFamily: 'Playwright-Regular',
                                }}
                                placeholderTextColor={'white'}
                                underlineColor='white'
                                placeholder='Password'
                                autoCapitalize={'none'}
                                underlineStyle={{
                                    borderWidth: 1,
                                    borderColor: 'white',
                                }}
                            />
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                padding: 10,
                                paddingTop: 20,
                            }}
                        >
                            <>
                                <View
                                    style={{
                                        flex: 1,
                                        paddingRight: 20,
                                    }}
                                >
                                    <Button
                                        style={{
                                            height: 50,
                                            backgroundColor:
                                                password.length && email.length
                                                    ? '#26aad1'
                                                    : 'white',
                                            justifyContent: 'center',
                                        }}
                                        labelStyle={{
                                            color:
                                                password.length && email.length
                                                    ? 'white'
                                                    : 'black',
                                            fontFamily: 'Playwright-Regular',
                                            fontSize: 18,
                                            lineHeight: 30,
                                        }}
                                        disabled={
                                            !(password.length && email.length)
                                        }
                                        onPress={() => signInWithEmail()}
                                    >
                                        Log In →
                                    </Button>
                                </View>
                            </>
                        </View>
                    </>
                </View>
            </View>
            <Modal
                visible={newUserModal}
                onDismiss={hideModal}
                contentContainerStyle={styles.modal}
                style={{ backgroundColor: '#27272770' }}
            >
                <ThemedText
                    style={{
                        // position: 'absolute',
                        // top: 0,
                        // zIndex: 9999,
                        // backgroundColor: '#ffffff75',
                        // background:
                        //     'linear-gradient(to bottom, transparent -48%,black -38%, transparent 31%)',
                        // width: '100%',
                        // height: '100%',
                        // color: 'white',
                        // fontSize: 60,
                        // textShadow: '#4d4d4d 2px 2px',
                        // textAlign: 'center',
                        // lineHeight: '47vw',
                        // fontFamily: 'Playwright-Regular',
                        pointerEvents: 'none',
                        fontSize: 18,
                        paddingBottom: 20,
                        whiteSpace: 'normal  ',
                    }}
                >
                    No account found associated with{' '}
                    <Text style={{ fontWeight: 600 }}>{email}</Text>. Would you
                    like to create a new account?
                </ThemedText>
                <Button
                    style={{
                        height: 50,
                        backgroundColor:
                            password.length && email.length
                                ? '#26aad1'
                                : 'white',
                        justifyContent: 'center',
                    }}
                    labelStyle={{
                        color:
                            password.length && email.length ? 'white' : 'black',
                        fontFamily: 'Playwright-Regular',
                        fontSize: 18,
                        lineHeight: 30,
                    }}
                    disabled={!(password.length && email.length)}
                    onPress={() => signUpWithEmail()}
                >
                    Sign Up with IFS Assistant!
                </Button>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#837260',
        justifyContent: 'space-between',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    verticallySpaced: {},
    mt20: {},
    confirm: {
        backgroundColor: '#26aad1',
    },
});
