import { useEffect } from "react";
import { Text, StyleSheet } from "react-native";

import { theme } from "../styles/theme";

export default function Time({ time, setIsOlderRide, seats }) {
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

  const diffDays = Math.floor((today - rideDay) / (1000 * 60 * 60 * 24));

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

  useEffect(() => {
    if (setIsOlderRide) {
      if (dayString !== "Today") {
        setIsOlderRide(true);
      } else {
        setIsOlderRide(false);
      }
    }
  }, [dayString]);

  const hours = rideDate.getHours().toString().padStart(2, "0");
  const minutes = rideDate.getMinutes().toString().padStart(2, "0");

  const displaySeats = seats === 1 ? "1 seat" : `${seats} seats`;

  return (
    <Text style={styles.time}>
      {dayString} | {hours}:{minutes} ({displaySeats})
    </Text>
  );
}

const styles = StyleSheet.create({
  time: {
    fontSize: theme.fontSize._12,
    color: theme.color.orange500,
    fontWeight: theme.weight.medium,
  },
});
