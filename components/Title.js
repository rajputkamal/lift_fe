import { Text, StyleSheet } from "react-native";

import { colors } from "../constants/colors";

export default function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: colors.gray900,
    textAlign: 'center'
  },
});
