import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

import { colors } from "../constants/colors";

export default function Seats({ seats, setSeats }) {
  

  const increment = () => {
  if (seats < 6) {
    const newSeats = seats + 1;
    setSeats(newSeats);
    // onChange?.(newSeats);
  } else {
    Alert.alert("Maximum seats reached", "You cannot have more than 6 seats.");
  }
};

const decrement = () => {
  if (seats > 1) {
    const newSeats = seats - 1;
    setSeats(newSeats);
    // onChange?.(newSeats);
  } else {
    Alert.alert("Minimum seats reached", "You must have at least 1 seat.");
  }
};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={decrement}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.seatText}>{seats}</Text>

      <TouchableOpacity style={styles.button} onPress={increment}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
    paddingHorizontal: 10,
    // paddingVertical: 5,
    marginVertical: 8,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: colors.gray300,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  seatText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.gray900
  },
});
