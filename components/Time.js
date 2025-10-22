import { Text, StyleSheet } from "react-native";

import { colors } from "../constants/colors";

export default function Time({ time, onLabelChange }) {
  if (!time) return null;

  const rideDate = new Date(time);
  const now = new Date();

  // Normalize both dates to midnight (ignore time portion)
  const rideDay = new Date(
    rideDate.getFullYear(),
    rideDate.getMonth(),
    rideDate.getDate()
  );
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffDays = Math.round((today - rideDay) / (1000 * 60 * 60 * 24));

  let dayString;
  if (diffDays === 0) {
    dayString = "Today";
  } else if (diffDays === 1) {
    dayString = "Yesterday";
  } else {
    const day = rideDate.getDate().toString().padStart(2, "0");
    const month = rideDate.toLocaleString("en-US", { month: "short" });
    const year = rideDate.getFullYear();
    dayString = `${day}-${month}-${year}`;
  }

  if (onLabelChange) onLabelChange(dayString);

  const hours = rideDate.getHours().toString().padStart(2, "0");
  const minutes = rideDate.getMinutes().toString().padStart(2, "0");

  return (
    <Text style={styles.time}>
      {dayString} | {hours}:{minutes}
    </Text>
  );
}

const styles = StyleSheet.create({
  time: {
    fontSize: 13,
    color: colors.orange500,
    fontWeight: "500",
  },
});
