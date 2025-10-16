import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";

import { colors } from "../constants/colors";
import Timer from "../components/Timer";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Otp({ navigation }) {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (index < 3) {
        inputs.current[index + 1].focus();
      }
    } else if (text === "") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

  const handleSubmit = () => {
    const fullCode = code.join("");
    console.log("Entered code:", fullCode);
    navigation.navigate("map");
  };

  const isDisabled = code.some((digit) => digit === "");

  useEffect(() => {
    const timer = setTimeout(() => {
      inputs.current[0]?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Card>
              <Text style={styles.title}>Enter Verification Code</Text>
              <Text style={styles.subtitle}>
                We’ve sent a 4-digit code to your number{" "}
                <Text style={styles.number}>XXXXX1190</Text>
              </Text>

              <View style={styles.inputRow}>
                {code.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(el) => (inputs.current[index] = el)}
                    style={styles.inputBox}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                  />
                ))}
              </View>

              <Button onPress={handleSubmit} disabled={isDisabled}>
                Get Started
              </Button>

              <Timer />
            </Card>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray100,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    color: colors.gray900,
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: colors.gray600,
    fontSize: 12,
    marginBottom: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: colors.gray300,
    width: 48,
    height: 50,
    textAlign: "center",
    fontSize: 24,
    marginHorizontal: 5,
    borderRadius: 8,
    color: colors.gray900,
  },
});
