import { useState } from "react";
import {
  Platform,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { colors } from "../constants/colors";

export default function TimePicker({ time, setTime }) {
  const [showPicker, setShowPicker] = useState(false);
  const [showText, setShowText] = useState(true);

  const onChange = (_, selectedTime) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedTime) setTime(selectedTime);
  };

  const showTimePicker = () => {
    setShowPicker(true);
    if (Platform.OS === "ios") {
      setShowText(false);
    }
  };

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.container}>
      {showText && (
        <TouchableOpacity onPress={showTimePicker} style={styles.timeButton}>
          <Text style={styles.timeText}>{formattedTime}</Text>
        </TouchableOpacity>
      )}

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={styles.dateTimePicker}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  timeButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.gray200,
    borderRadius: 50,
  },
  timeText: {
    fontSize: 14,
    color: colors.gray900,
  },
  dateTimePicker: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
});
