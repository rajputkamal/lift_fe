import { View, Text, StyleSheet } from "react-native";
import { Copyright } from "lucide-react-native";

import { theme } from "../styles/theme";

//old copyright symbol ©
export default function CopyRight() {
  return (
    <View>
      <Text style={styles.label}>
        Copyright <Copyright size={12} color={theme.color.gray400} />{" "}
        {new Date().getFullYear()} Lift. All Rights Reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: theme.fontSize._12,
    color: theme.color.gray400,
  },
});
