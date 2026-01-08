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

import { theme } from "../styles/theme";
import Timer from "../components/Timer";
import Card from "../components/Card";
import Button from "../components/Button";
import { fetchOTP, verifyOTP } from "../apis/otp.js";
import Title from "../components/Title";
import { saveToken } from "../utils/identity";
import { maskNumber } from "../utils/helper";
import LiftSnackBar from "../components/LiftSnackbar";

export default function Otp({ route, navigation }) {
  const inputs = useRef([]);
  const { phoneNumber, verificationId } = route.params;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [code, setCode] = useState(["", "", "", ""]);

  //state to store resend OTP result as now we have to send verificationId to the verify OTP call
  const [resendOtpResult, setResendOtpResult] = useState(null);

  const handleChange = (text, index) => {
    // CASE 1: User pasted full OTP (clipboard)
    if (/^\d{4}$/.test(text)) {
      const digits = text.split("");
      setCode(digits);

      // focus last input for visual confirmation
      inputs.current[3]?.focus();
      return;
    }

    // CASE 2: Normal single digit entry
    if (/^\d$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (index < 3) {
        inputs.current[index + 1]?.focus();
      }
    }

    // CASE 3: Clear
    if (text === "") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const otp = code.join("");
    const vId = resendOtpResult
      ? resendOtpResult?.verificationId
      : verificationId;
    const result = await verifyOTP(phoneNumber, otp, vId);
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
    } else {
      setResendOtpResult(result);
    }
    setLoading(false);
    setTimeLeft(60);
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
                A 4‑digit OTP has been sent to
                <Text style={styles.maskedNumber}>
                  {" "}
                  {maskNumber(phoneNumber)}{" "}
                </Text>
              </Title>

              <View style={styles.inputRow}>
                {code.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(el) => (inputs.current[index] = el)}
                    style={styles.inputBox}
                    keyboardType="numeric"
                    maxLength={index === 0 ? 4 : 1}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    textContentType="oneTimeCode" //iOS
                    autoComplete="sms-otp" // Android
                    importantForAutofill="yes"
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
            duration={2000}
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
    paddingHorizontal: theme.spacing.lg,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
    gap: 10,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: theme.color.gray300,
    width: 48,
    height: 50,
    textAlign: "center",
    fontSize: 24,
    marginHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    color: theme.color.gray900,
  },
  maskedNumber: {
    color: theme.color.gray900,
    fontWeight: theme.weight.medium,
  },
});
