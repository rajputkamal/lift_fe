import { useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { colors } from "../constants/colors";

export default function Timer({ timeLeft, setTimeLeft, handleResend }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft]);

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
    color: colors.orange500,
    fontSize: 14,
    marginVertical: 24,
    textAlign: "center",
    fontWeight: "500",
  },
  resendText: {
    color: colors.orange500,
    fontWeight: "bold",
  },
});
