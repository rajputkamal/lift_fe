import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../constants/colors";

export default function Info({ text }) {
  return (
    <View style={styles.infoContainer}>
      <Ionicons
        name="information-circle-outline"
        size={14}
        color={colors.orange500}
      />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    color: colors.orange500,
    fontSize: 12,
    marginLeft: 4,
  },
});
