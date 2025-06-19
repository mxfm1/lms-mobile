import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ActivityIndicator, GestureResponderEvent, Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native'

interface CustomButtonProps {
  label: string
  onPress?: (event: GestureResponderEvent) => void
  icon?: keyof typeof Ionicons.glyphMap
  iconColor?: string
  textColor?: string
  backgroundColor?: string
  style?: ViewStyle
  textStyle?: TextStyle
  iconSize?: number
  disabled?: boolean
  isLoading?:boolean
  loaderColor?:string
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onPress,
  icon,
  iconColor = 'white',
  textColor = 'white',
  backgroundColor = '#007AFF',
  style,
  textStyle,
  iconSize = 20,
  disabled = false,
  isLoading,
  loaderColor='white',
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, opacity: pressed || disabled || isLoading ? 0.6 : 1 },
        style,
      ]}
    >
      {isLoading ? (
          <ActivityIndicator size='small' color={loaderColor}/>
      ): (
        <>
          {icon && <Ionicons name={icon} size={iconSize} color={iconColor} style={styles.icon} />}
          <Text style={[styles.text, { color: textColor }, textStyle]}>{label}</Text>
        </>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
})

export default CustomButton
