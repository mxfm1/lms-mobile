import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";

type IoniconName = React.ComponentProps<typeof Ionicons>['name']

interface AuthButtonProps {
  label: string;
  onPress: () => void;
  iconName?: IoniconName;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
}

export const AuthButton = ({
  label,
  onPress,
  iconName,
  backgroundColor = "#ffffff",
  textColor = "#000000",
  iconColor = "#000000",
}: AuthButtonProps) => {
  return (
    <Pressable
      onPress={() => onPress()}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? `${backgroundColor}cc` : backgroundColor },
      ]}
    >
      {iconName && (
        <Ionicons name={iconName} size={20} color={iconColor} style={styles.icon} />
      )}
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  } as ViewStyle,
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  } as TextStyle,
});