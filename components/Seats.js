import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Minus, Plus } from "lucide-react-native";

import { theme } from "../styles/theme";

export default function Seats({ seats, setSeats, vehicleType }) {
  const increment = () => {
    if (seats < 4) {
      const newSeats = seats + 1;
      setSeats(newSeats);
    }
  };

  const decrement = () => {
    if (seats > 1) {
      const newSeats = seats - 1;
      setSeats(newSeats);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={decrement}
        disabled={seats === 1}
      >
        <Minus
          color={seats === 1 ? theme.color.gray400 : theme.color.gray900}
          size={16}
        />
      </TouchableOpacity>

      <Text style={styles.text}>{seats}</Text>

      <TouchableOpacity
        style={styles.button}
        disabled={seats === 4 || vehicleType === "bike"}
        onPress={increment}
      >
        <Plus
          color={
            seats === 4 || vehicleType === "bike"
              ? theme.color.gray400
              : theme.color.gray900
          }
          size={16}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
  button: {
    width: 26,
    height: 26,
    borderRadius: theme.borderRadius.rounded,
    backgroundColor: theme.color.gray200,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: theme.color.gray900,
    fontSize: theme.fontSize._16,
  },
});
