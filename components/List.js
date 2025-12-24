import { StyleSheet, View, Text } from "react-native";
import { MapPin } from "lucide-react-native";

import { colors } from "../constants/colors";

export default function List({ description }) {
  return (
    <View style={styles.list}>
      <MapPin size={18} color={colors.gray900} />
      <Text style={styles.suggestionText}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    paddingVertical: 8,
    borderBottomColor: colors.gray300,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  suggestionText: {
    fontSize: 14,
    color: colors.gray900,
    marginLeft: 8,
  },
});
