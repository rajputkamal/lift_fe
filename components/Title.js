import { Text, StyleSheet } from "react-native";

import { colors } from "../constants/colors";

export default function Title({ children, mainHeading = false }) {
  return (
    <Text
      style={mainHeading ? [styles.title, styles.mainHeading] : [styles.title]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 12,
    color: colors.gray900,
    textAlign: "center",
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
