import { TouchableOpacity, StyleSheet } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

import { theme } from "../styles/theme";

export default function SwitchIcon({ onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Octicons name="arrow-switch" size={24} color={theme.color.gray900} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    transform: [{ rotate: "90deg" }],
    marginBottom: theme.spacing.sm,
  },
});
