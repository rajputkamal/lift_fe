import { View, StyleSheet, Text } from "react-native";
import { Trash2, Pencil } from "lucide-react-native";

import Button from "./Button";
import { theme } from "../styles/theme";

export default function RideActions({
  loadingRideDeletion,
  onDeleteRide,
  onUpdateRide,
}) {
  return (
    <View style={styles.actionButtons}>
      <View style={styles.button}>
        <Button
          secondary
          loadingRideDeletion={loadingRideDeletion}
          onPress={onDeleteRide}
        >
          <View style={styles.icons}>
            <Trash2 color={theme.color.orange500} size={16} />
            <Text
              style={{
                color: theme.color.orange500,
                fontSize: theme.fontSize._16,
              }}
            >
              Delete
            </Text>
          </View>
        </Button>
      </View>
      <View style={styles.button}>
        <Button onPress={onUpdateRide}>
          <View style={styles.icons}>
            <Pencil color={theme.color.white} size={14} />
            <Text
              style={{ color: theme.color.white, fontSize: theme.fontSize._16 }}
            >
              Edit
            </Text>
          </View>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.xs,
  },
  button: {
    width: "50%",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
});
