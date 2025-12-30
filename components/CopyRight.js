import { View, Text, StyleSheet } from "react-native";

import { theme } from "../styles/theme";

export default function CopyRight() {
  return (
    <View>
      <Text style={styles.label}>
        Copyright © {new Date().getFullYear()} Lift. All Rights Reserved.
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
