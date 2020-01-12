import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface ButtonProps {
    icon: string;
    onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ icon, onPress }) => {
    return (
        <TouchableOpacity onPressOut={onPress}>
            <FontAwesome name={icon} size={100} color="white" />
        </TouchableOpacity>
    );
};
