import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";

import { colors } from "../constants/colors";

export default function LiftInput({
  keyboardType = "default",
  onChangeText,
  onPressCloseIcon,
  ...props
}) {
  return (
    <View style={styles.inputContainer}>
      {keyboardType === "numeric" && (
        <Text style={styles.countryCode}>+91</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCorrect={false}
        spellCheck={false}
        {...props}
      />
      {props.value?.length > 0 && (
        <TouchableOpacity style={styles.icon} onPress={onPressCloseIcon}>
          <Fontisto name="close" size={18} color={colors.gray400} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 10,
    overflow: "hidden",
  },
  countryCode: {
    fontSize: 16,
    color: colors.gray900,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: colors.gray300,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: colors.gray900,
  },
  icon: {
    paddingHorizontal: 12,
  },
});
