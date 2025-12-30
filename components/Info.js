import { StyleSheet, Text, View } from "react-native";
import { Info as InfoIcon } from "lucide-react-native";

import { theme } from "../styles/theme";

export default function Info({ text }) {
  return (
    <View style={styles.infoContainer}>
      <InfoIcon size={12} color={theme.color.gray400} />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    color: theme.color.gray400,
    fontSize: theme.fontSize._12,
    marginLeft: theme.spacing.xs,
  },
});
