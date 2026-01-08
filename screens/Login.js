import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";

import Card from "../components/Card";
import Button from "../components/Button";
import LiftInput from "../components/LiftInput";
import { fetchOTP } from "../apis/otp.js";
import Title from "../components/Title";
import { theme } from "../styles/theme";
import Info from "../components/Info";
import LiftSnackBar from "../components/LiftSnackbar";

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [number, setNumber] = useState("");
  const inputRef = useRef(null);

  const numberChangeHandler = (num) => setNumber(num);

  const onContinue = async () => {
    if (isNaN(number) || !/^[6-9]\d{9}$/.test(number)) {
      setError("Invalid Number. Please enter a valid 10-digit mobile number.");
      return;
    }
    setLoading(true);
    const result = await fetchOTP(number);
    if (result?.message === "OTP sent successfully") {
      navigation.navigate("otp", {
        phoneNumber: number,
        verificationId: result.verificationId,
      });
    } else {
      setError("Failed to send OTP. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
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
              <Title mainHeading>
                Share your route. Save your cost.{" "}
                <Text style={styles.highlightedText}>Ride together.</Text>{" "}
              </Title>
              <Title subHeading>
                Ready to share a ride and{" "}
                <Text style={styles.highlightedText}>save more?</Text>
              </Title>

              <LiftInput
                ref={inputRef}
                onChangeText={numberChangeHandler}
                value={number}
                placeholder="Enter mobile number*"
                keyboardType="numeric"
                maxLength={10}
                onPressCloseIcon={() => setNumber("")}
              />

              <Info text="We’ll send you a one-time password (OTP) to verify." />

              <Button
                onPress={onContinue}
                disabled={number.length !== 10}
                loading={loading}
              >
                Continue
              </Button>
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
    paddingHorizontal: theme.spacing.lg,
    justifyContent: "center",
  },
  highlightedText: {
    color: theme.color.blue600,
  },
});
