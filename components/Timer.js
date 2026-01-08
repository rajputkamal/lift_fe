import { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { theme } from "../styles/theme";

export default function Timer({ timeLeft, setTimeLeft, handleResend }) {
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <View>
      {timeLeft > 0 ? (
        <Text style={styles.subtitle}>Resend OTP in {timeLeft}s</Text>
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
    color: theme.color.orange500,
    fontSize: theme.fontSize._14,
    marginTop: theme.spacing.lg,
    textAlign: "center",
    fontWeight: theme.weight.medium,
  },
  resendText: {
    color: theme.color.orange500,
    fontWeight: theme.weight.semi,
  },
});
