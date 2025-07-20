import { useThemeColor } from '@/hooks/useThemeColor';
import React, { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';

type ButtonProps = TouchableOpacityProps & {
  variant?: 'default' | 'primary' | 'outline' | 'destructive' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  style,
  textStyle,
  ...rest
}: ButtonProps) {
  const primaryColor = useThemeColor({}, 'primary');
  const primaryFgColor = useThemeColor({}, 'primaryForeground');
  const destructiveColor = useThemeColor({}, 'destructive');
  const destructiveFgColor = useThemeColor({}, 'destructiveForeground');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...getSizeStyle(),
    };

    if (disabled) {
      return {
        ...baseStyle,
        opacity: 0.5,
      };
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: primaryColor,
        };
      case 'destructive':
        return {
          ...baseStyle,
          backgroundColor: destructiveColor,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      case 'link':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          paddingHorizontal: 0,
          paddingVertical: 0,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      ...styles.text,
      ...getTextSizeStyle(),
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseTextStyle,
          color: primaryFgColor,
        };
      case 'destructive':
        return {
          ...baseTextStyle,
          color: destructiveFgColor,
        };
      case 'outline':
      case 'ghost':
        return {
          ...baseTextStyle,
          color: textColor,
        };
      case 'link':
        return {
          ...baseTextStyle,
          color: primaryColor,
          textDecorationLine: 'underline',
        };
      default:
        return baseTextStyle;
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return styles.buttonSm;
      case 'lg':
        return styles.buttonLg;
      default:
        return {};
    }
  };

  const getTextSizeStyle = (): TextStyle => {
    switch (size) {
      case 'sm':
        return styles.textSm;
      case 'lg':
        return styles.textLg;
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || isLoading}
      style={[getButtonStyle(), style]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? primaryFgColor : primaryColor}
        />
      ) : (
        <View style={styles.content}>
          {typeof children === 'string' ? (
            <ThemedText style={[getTextStyle(), textStyle]}>{children}</ThemedText>
          ) : (
            children
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonSm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonLg: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  textSm: {
    fontSize: 14,
  },
  textLg: {
    fontSize: 18,
  },
}); 