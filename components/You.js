import { Text, StyleSheet } from "react-native";

import { colors } from "../constants/colors";

export default function You() {
  return <Text style={styles.text}>You</Text>;
}

const styles = StyleSheet.create({
  text: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
    backgroundColor: colors.orange500,
    opacity: 0.8,
    alignItems: "center",
    justifyContent: "center",
    color: colors.white,
    fontSize: 16,
  },
});
