import { Text, StyleSheet, View } from "react-native";
import { RotateCcw } from "lucide-react-native";

import { theme } from "../styles/theme";
import Button from "./Button";

export default function RepostAction({ onRepostRide }) {
  return (
    <Button onPress={onRepostRide}>
      <View style={styles.buttonContent}>
        <RotateCcw size={18} color={theme.color.white} />

        <Text
          style={{
            color: theme.color.white,
            fontSize: theme.fontSize._16,
          }}
        >
          Repost
        </Text>
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
