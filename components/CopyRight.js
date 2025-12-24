import { View, Text, StyleSheet } from "react-native";

import { colors } from "../constants/colors";

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
    fontSize: 14,
    color: colors.gray400,
  },
});
