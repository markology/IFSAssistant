import ButtonGroup, { ButtonMode } from '@/app/components/ButtonGroup';
import { useTheme } from '@/app/components/ThemeContext';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import ThemedText from '@/app/components/ThemedText';
const buttons = [
    {
        mode: 'contained' as ButtonMode,
        text: 'Beginner',
    },
    {
        mode: 'contained' as ButtonMode,
        text: 'Intermediate',
    },
    {
        mode: 'contained',
        text: 'Advanced',
    },
];

export default () => {
    return (
        <View
            style={{
                alignItems: 'center',
                display: 'flex',
                width: 400,
                alignSelf: 'center',
            }}
        >
            <View>
                <ThemedText
                    ta='left'
                    pt={20}
                    size={'paragraph'}
                    fw='ExtraLight'
                >
                    We’re excited to guide you through exploring your inner
                    world using Internal Family Systems coined by Dr. Richard
                    Schwartz in 1999
                </ThemedText>
            </View>
            <View style={[]}>
                <ThemedText size={'subtext'}>What's your name</ThemedText>
                <TextInput
                    style={{
                        width: 340,
                        alignSelf: 'center',
                        backgroundColor: 'transparent',
                    }}
                    underlineColor='#800080'
                    activeUnderlineColor='white'
                    underlineStyle={{ height: 2 }}
                    theme={{
                        colors: {},
                        dark: true,
                        version: 3,
                    }}
                    textColor='white'
                    placeholderTextColor='white'
                    mode='flat'
                    placeholder='Enter your name'
                    autoCapitalize={'none'}
                />
                <ThemedText pt={20} size={'subheader'}>
                    What's your experience level doing IFS?
                </ThemedText>
                <ButtonGroup buttons={buttons} />
            </View>
        </View>
    );
};
