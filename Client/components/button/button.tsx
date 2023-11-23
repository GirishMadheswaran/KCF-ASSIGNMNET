import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { buttonStyles } from './buttonStyles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ onPress, title, style, ...props }) => {
  return (
    <TouchableOpacity style={[buttonStyles.button, style]} onPress={onPress} {...props}>
      <Text style={buttonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};


export default Button;
