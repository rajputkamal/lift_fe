import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { theme } from "../styles/theme";

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
        <ActivityIndicator size="small" color={theme.color.gray300} />
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
    backgroundColor: theme.color.purple600,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
  },
  buttonText: {
    color: theme.color.white,
    fontSize: theme.fontSize._16,
    fontWeight: theme.weight.semi,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.color.orange500,
  },
  secondaryButtonText: {
    color: theme.color.orange500,
  },
  secondaryDisabled: {
    borderColor: theme.color.gray300,
  },
  disabledText: {
    color: theme.color.gray400,
  },
});
