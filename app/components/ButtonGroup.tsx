import { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export type ButtonMode =
    | 'text'
    | 'outlined'
    | 'contained'
    | 'elevated'
    | 'contained-tonal'
    | undefined;

type ButtonGroupItem = {
    text: string;
    mode: ButtonMode;
    onPress?: () => void;
};

type ButtonGroup = ButtonGroupItem[];

export default ({ buttons }: { buttons: ButtonGroup }) => {
    const [active, setActive] = useState(-1);
    const onPress = (index: number, onPressProp?: () => void) => {
        setActive(index);
    };
    // console.log({ buttons });
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                padding: 20,
                // justifyContent: 'space-evenly',
            }}
        >
            {buttons.map((button: ButtonGroupItem, index: number) => (
                <Button
                    style={{
                        flex: 1,
                        maxWidth: 130,
                        borderRadius: index !== 0 ? 0 : 100,
                        borderBottomRightRadius:
                            index !== buttons.length - 1 ? 0 : 100,
                        borderTopRightRadius:
                            index !== buttons.length - 1 ? 0 : 100,
                    }}
                    key={`buttongroup-button-${index}`}
                    mode={button.mode}
                    onPress={() => onPress(index, button.onPress)}
                    buttonColor={active === index ? '#800080aa' : 'purple'}
                >
                    {button.text}
                </Button>
            ))}
        </View>
    );
};
