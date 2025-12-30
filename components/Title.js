import { Text, StyleSheet } from "react-native";

import { theme } from "../styles/theme";

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
    fontWeight: theme.weight.semi,
    marginBottom: theme.spacing.sm,
    color: theme.color.gray900,
    textAlign: "center",
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: theme.weight.bold,
  },
  subHeading: {
    color: theme.color.gray400,
    fontWeight: theme.weight.regular,
    fontSize: theme.fontSize._16,
    lineHeight: 22
  },
});
