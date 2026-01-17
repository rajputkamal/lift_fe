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
  loadingRideDeletion,
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
      {loading || loadingRideDeletion ? (
        <ActivityIndicator
          size="small"
          color={
            loadingRideDeletion ? theme.color.orange500 : theme.color.gray300
          }
        />
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
    borderRadius: theme.borderRadius.x_lg,
    alignItems: "center",
  },
  buttonText: {
    color: theme.color.white,
    fontSize: theme.fontSize._16,
    fontWeight: theme.weight.medium,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.color.orange500,
  },
  secondaryButtonText: {
    color: theme.color.orange500,
    fontSize: theme.fontSize._14,
    fontWeight: theme.weight.medium,
  },
  secondaryDisabled: {
    borderColor: theme.color.gray300,
  },
  disabledText: {
    color: theme.color.gray400,
  },
});
