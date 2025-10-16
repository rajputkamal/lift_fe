import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { colors } from "../constants/colors";

export default function Timer() {
  const timerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(180);
    // TODO: trigger your resend OTP API call here
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <View>
      {timeLeft > 0 ? (
        <Text style={styles.subtitle}>
          Resend OTP in {formatTime(timeLeft)}
        </Text>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text style={[styles.subtitle, styles.resendText]}>Resend OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: colors.gray600,
    fontSize: 14,
    marginVertical: 24,
    textAlign: "center",
  },
  resendText: {
    color: colors.purple600,
    fontWeight: "bold",
  },
});
