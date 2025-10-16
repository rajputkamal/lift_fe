import { StyleSheet, View, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { colors } from "../constants/colors";

export default function List({ description }) {
  return (
    <View style={styles.list}>
      <FontAwesome name="map-marker" size={18} color={colors.gray900} />
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
    marginLeft: 12,
  },
});
