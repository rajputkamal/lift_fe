import { Text, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export default function Time({ time, isOlderRide }) {
  if (!time) return null;

  const rideDate = new Date(time);
  const now = new Date();

  // Reset hours to 0 for date-only comparison
  const rideDay = new Date(
    rideDate.getFullYear(),
    rideDate.getMonth(),
    rideDate.getDate()
  );
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = today - rideDay;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  let dayString = "Older";
  if (diffDays === 0) dayString = "Today";
  else if (diffDays === 1) dayString = "Yesterday";

  isOlderRide = dayString;

  const hours = rideDate.getHours().toString().padStart(2, "0");
  const minutes = rideDate.getMinutes().toString().padStart(2, "0");

  return (
    <Text style={styles.time}>
      {dayString} {hours}:{minutes}
    </Text>
  );
}

const styles = StyleSheet.create({
  time: {
    fontSize: 13,
    color: colors.gray400,
  },
});
