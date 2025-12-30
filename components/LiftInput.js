import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CircleX } from "lucide-react-native";

import { theme } from "../styles/theme";

export default function LiftInput({
  keyboardType = "default",
  onChangeText,
  onPressCloseIcon,
  ...props
}) {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <View style={styles.inputContainer}>
      {keyboardType === "numeric" && (
        <Text style={styles.countryCode}>+91</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setIsTyping(true);
          onChangeText(text);
        }}
        keyboardType={keyboardType}
        autoCorrect={false}
        spellCheck={false}
        multiline={false}
        numberOfLines={1}
        textAlign="left"
        textAlignVertical="center"
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
        selection={
          !isTyping && props.value?.length > 0
            ? { start: 0, end: 0 }
            : undefined
        }
        {...props}
      />
      {props.value?.length > 0 && (
        <TouchableOpacity style={styles.icon} onPress={onPressCloseIcon}>
          <CircleX size={18} color={theme.color.gray400} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.color.gray300,
    borderRadius: theme.borderRadius.sm,
    overflow: "hidden",
  },
  countryCode: {
    fontSize: theme.fontSize._16,
    color: theme.color.gray900,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRightWidth: 1,
    borderRightColor: theme.color.gray300,
    fontWeight: theme.weight.medium,
  },
  input: {
    flex: 1,
    fontSize: theme.fontSize._16,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    color: theme.color.gray900,
  },
  icon: {
    paddingHorizontal: theme.spacing.md,
  },
});
