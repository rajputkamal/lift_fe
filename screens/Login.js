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

export default function Login({ navigation }) {
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
    console.log("Continue pressed with number:", number);
    if (number.length !== 10) {
      setError("Mobile number must be 10 digits");
      return;
    }
    const result = await fetchOTP(number);
    console.log("OTP fetch result:", result);
    if (result?.otp) {
      navigation.navigate("otp", { phoneNumber: number });
    } else {
      Alert.alert(
        "Something went wrong!",
        "Failed to send OTP. Please try again."
      );
    }
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

              <Button onPress={onContinue} disabled={number.length !== 10}>
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
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
});
