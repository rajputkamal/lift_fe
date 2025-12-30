import { useEffect } from "react";

import { StyleSheet, Text, View } from "react-native";
import { Snackbar } from "react-native-paper";

import { theme } from "../styles/theme";
import { useKeyboardOpen } from "../hooks/useKeyboardOpen";

export default function LiftSnackBar({
  visible,
  text,
  type = "info",
  onDismiss,
  duration = 3000,
  ...props
}) {
  const isKeyboardOpen = useKeyboardOpen();
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, onDismiss, duration]);

  if (!visible) return null;
  return (
    <View
      style={[styles.snackbar, isKeyboardOpen ? styles.top : styles.bottom]}
    >
      <Snackbar
        visible={visible}
        style={[
          styles[`${type}Snackbar`],
          { borderRadius: theme.borderRadius.sm },
        ]}
        duration={duration}
        {...props}
      >
        <Text style={styles.text}>
          {text ||
            "To offer or book rides smoothly, we recommend adding your name to your profile."}
        </Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    position: "absolute",
    left: 8,
    right: 8,
  },
  top: {
    top: "25%",
  },
  bottom: {
    bottom: 40,
  },
  infoSnackbar: {
    backgroundColor: theme.color.orange500,
  },
  errorSnackbar: {
    backgroundColor: theme.color.red600,
  },
  successSnackbar: {
    backgroundColor: theme.color.green600,
  },
  text: {
    color: theme.color.white,
  },
});
