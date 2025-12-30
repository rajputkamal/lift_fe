import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CalendarDays } from "lucide-react-native";

import { theme } from "../styles/theme";

export default function TimePicker({ dateTime, setDateTime }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateTime(date);
    hideDatePicker();
  };

  const formattedDateTime = new Date(dateTime).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker}>
        <CalendarDays size={20} color={theme.color.purple600} />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
        isDarkModeEnabled
      />
      <Text style={styles.timeText}>{formattedDateTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  timeText: {
    fontSize: theme.fontSize._14,
    color: theme.color.gray900,
    fontWeight: theme.weight.medium,
  },
});
