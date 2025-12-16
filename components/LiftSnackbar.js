import { StyleSheet, Text } from "react-native";
import { Snackbar } from "react-native-paper";

import { colors } from "../constants/colors";

export default function LiftSnackBar({ visible, text, type = "info" }) {
  return (
    <Snackbar visible={visible} style={[styles[`${type}Snackbar`]]}>
      <Text style={styles.text}>
        {text ||
          "To offer or book rides smoothly, we recommend adding your name to your profile."}
      </Text>
    </Snackbar>
  );
}

const styles = StyleSheet.create({
  infoSnackbar: {
    backgroundColor: colors.orange500,
  },
  errorSnackbar: {
    backgroundColor: colors.red600,
  },
  successSnackbar: {
    backgroundColor: colors.green600,
  },
  text: {
    color: colors.white,
  },
});
