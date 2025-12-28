import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import { colors } from "../constants/colors";

export default function Button({
  children,
  onPress,
  secondary,
  customStyles,
  disabled,
  loading,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        secondary && styles.secondaryButton,
        disabled && (secondary ? styles.secondaryDisabled : styles.disabled),
        customStyles,
      ]}
      onPress={!disabled ? onPress : null}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.gray300} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            secondary && styles.secondaryButtonText,
            disabled && styles.disabledText,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple600,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.orange500,
  },
  secondaryButtonText: {
    color: colors.orange500,
  },
  secondaryDisabled: {
    borderColor: colors.gray300,
  },
  disabledText: {
    color: colors.gray400,
  },
});
