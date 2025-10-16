import { useState } from "react";
import { Platform, View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TimePicker({time, setTime}) {
  // const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedTime) => {
    // setShowPicker(Platform.OS === "ios");
    if (selectedTime) setTime(selectedTime);
  };
  return (
    <View style={styles.container}>
      <DateTimePicker
        value={time}
        mode="time"
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
