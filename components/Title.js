import { Text, StyleSheet } from "react-native";

import { colors } from "../constants/colors";

export default function Title({
  children,
  mainHeading = false,
  subHeading = false,
}) {
  return (
    <Text
      style={
        mainHeading
          ? [styles.title, styles.mainHeading]
          : subHeading
          ? [styles.title, styles.subHeading]
          : [styles.title]
      }
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 8,
    color: colors.gray900,
    textAlign: "center",
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: 700,
  },
  subHeading: {
    color: colors.gray400,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 22
  },
});
