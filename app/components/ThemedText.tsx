import { Text } from 'react-native-paper';
import { components } from '../lib/theme';

export default ({
    children,
    styles,
    ta,
    pt,
    fw,
    color,
    size,
    ...props
}: {
    children: React.ReactNode;
}) => (
    <Text
        style={{
            textAlign: ta,
            paddingTop: pt,
            fontFamily: `Playwright-${fw ?? 'Regular'}`,
            ...(size && components.text[size]),
            ...styles,
        }}
        {...props}
    >
        {children}
    </Text>
);
