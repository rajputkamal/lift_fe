import { StyleSheet, View, Text } from "react-native";
import { MapPin } from "lucide-react-native";

import { theme } from "../styles/theme";

export default function List({ description }) {
  return (
    <View style={styles.list}>
      <MapPin size={18} color={theme.color.gray900} />
      <Text style={styles.suggestionText}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    paddingVertical: theme.spacing.sm,
    borderBottomColor: theme.color.gray300,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  suggestionText: {
    fontSize: theme.fontSize._14,
    color: theme.color.gray900,
    marginLeft: theme.spacing.sm,
  },
});
