import { StyleSheet, View } from "react-native";

import { theme } from "../styles/theme";

export default function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: theme.color.white,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    shadowColor: theme.color.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6, // for Android shadow
  },
});
