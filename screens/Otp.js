import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Text,
} from "react-native";

import { colors } from "../constants/colors";
import Timer from "../components/Timer";
import Card from "../components/Card";
import Button from "../components/Button";
import { verifyOTP } from "../utils/api";
import Title from "../components/Title";
import { saveToken } from "../utils/identity";
import { fetchOTP } from "../utils/api";
import { maskNumber } from "../utils/helper";
import LiftSnackBar from "../components/LiftSnackbar";

export default function Otp({ route, navigation }) {
  const inputs = useRef([]);
  const { phoneNumber } = route.params;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [code, setCode] = useState(["", "", "", ""]);

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

  const handleSubmit = async () => {
    setLoading(true);
    const fullCode = code.join("");
    const result = await verifyOTP(phoneNumber, fullCode);
    if (result?.token) {
      await saveToken(result.token);
      navigation.navigate("map");
    } else {
      setError("The OTP you entered is incorrect. Please try again.");
    }
    setLoading(false);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace") {
      // If current box has a value → just clear it
      if (code[index] !== "") {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
        return;
      }

      // If empty → move focus to previous box
      if (index > 0) {
        inputs.current[index - 1].focus();
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
      }
    }
  };

  const isDisabled = code.some((digit) => digit === "");

  useEffect(() => {
    const timer = setTimeout(() => {
      inputs.current[0]?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleResend = async () => {
    setLoading(true);
    const result = await fetchOTP(phoneNumber);
    if (result?.message !== "OTP sent successfully") {
      setError("Failed to send OTP. Please try again.");
    }
    setLoading(false);
    setTimeLeft(180);
  };

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
              <Title mainHeading>Enter Verification Code</Title>
              <Title subHeading>
                A 4‑digit code has been sent to
                <Text style={styles.maskedNumber}>
                  {" "}
                  {maskNumber(phoneNumber)}{" "}
                </Text>
                If you don’t get it, we'll
                <Text style={styles.maskedNumber}> call you </Text>
                with the code.
              </Title>

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
                    onKeyPress={(e) => handleKeyPress(e, index)}
                  />
                ))}
              </View>

              <Button
                onPress={handleSubmit}
                disabled={isDisabled}
                loading={loading}
              >
                Get Started
              </Button>

              <Timer
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
                handleResend={handleResend}
              />
            </Card>
          </View>
          <LiftSnackBar
            visible={!!error}
            type="error"
            text={error}
            onDismiss={() => setError(null)}
          />
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
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
  maskedNumber: {
    color: colors.gray900,
    fontWeight: 500,
  },
});
