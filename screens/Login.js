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
  Alert,
} from "react-native";

import Card from "../components/Card";
import Button from "../components/Button";
import LiftInput from "../components/LiftInput";
import { fetchOTP } from "../utils/api";
import Title from "../components/Title";
import { colors } from "../constants/colors";

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const numberChangeHandler = (num) => {
    setNumber(num);

    if (num.length > 0 && num.length < 10) {
      setError("Mobile number must be 10 digits");
    } else {
      setError("");
    }
  };

  const onContinue = async () => {
    setLoading(true);
    if (number.length !== 10) {
      setError("Mobile number must be 10 digits.");
      setLoading(false);
      return;
    }
    const result = await fetchOTP(number);
    if (result?.message === "OTP sent successfully") {
      navigation.navigate("otp", { phoneNumber: number });
    } else {
      Alert.alert(
        "Something went wrong!",
        "Failed to send OTP. Please try again."
      );
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
              <Title mainHeading>Welcome! Let’s get you riding.</Title>
              <Title subHeading>
                Ready to share a ride and{" "}
                <Text style={{ color: colors.blue600 }}>save more?</Text>
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

              {error.length > 0 && (
                <Text style={styles.errorText}>{error}</Text>
              )}

              <Button
                onPress={onContinue}
                disabled={number.length !== 10}
                loading={loading}
              >
                Continue
              </Button>
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
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  errorText: {
    color: colors.orange500,
    marginBottom: 10,
    fontSize: 12,
  },
});
