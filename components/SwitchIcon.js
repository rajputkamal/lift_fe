import { TouchableOpacity, StyleSheet } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

import { colors } from "../constants/colors";

export default function SwitchIcon({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Octicons name="arrow-switch" size={24} color={colors.gray900} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    transform: [{ rotate: "90deg" }],
    marginBottom: 10,
  },
});
