import { StyleSheet, Text, View } from "react-native";
import { Info as InfoIcon } from "lucide-react-native";

import { colors } from "../constants/colors";

export default function Info({ text }) {
  return (
    <View style={styles.infoContainer}>
      <InfoIcon size={12} color={colors.gray400} />
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
    color: colors.gray400,
    fontSize: 12,
    marginLeft: 4,
  },
});
