import { StyleSheet, View } from "react-native";

import { colors } from "../constants/colors";

export default function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    // maxWidth: "400px",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6, // for Android shadow
  },
});
