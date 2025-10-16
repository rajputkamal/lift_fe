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
import Card from "../components/Card";
import Button from "../components/Button";

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

  const onContinue = () => {
    if (number.length !== 10) {
      setError("Mobile number must be 10 digits");
      return;
    }
    console.log("Continue with number:", number);
    navigation.navigate("otp");
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
              <Text style={styles.title}>Welcome! Let’s get you riding.</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  onChangeText={numberChangeHandler}
                  value={number}
                  placeholder="Enter mobile number*"
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>

              {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}

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
    backgroundColor: colors.gray100,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  title: {
    color: colors.gray900,
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },
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
    borderRightColor: colors.gray300
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: colors.gray900,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
});
