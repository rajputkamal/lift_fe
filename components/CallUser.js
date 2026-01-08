import { useState } from "react";

import { Linking, Platform, Text, View, StyleSheet } from "react-native";
import { Phone, ClipboardCopy } from "lucide-react-native";
import * as Clipboard from "expo-clipboard";

import Button from "./Button";
import { theme } from "../styles/theme";
import LiftSnackBar from "./LiftSnackbar";

export default function CallUser({ phoneNumber }) {
  const [callNotSupported, setCallNotSupported] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(null);

  const handleCallUser = async (phoneNumber) => {
    //TODO:: Yet to added the logger to count calling status
    const url =
      Platform.OS === "ios" ? `telprompt:${phoneNumber}` : `tel:${phoneNumber}`;

    try {
      const supported = await Linking.canOpenURL(url);

      if (!supported) {
        setError(
          "Unable to open dialer. Please copy the number and call manually."
        );
        setCallNotSupported(true);
        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      setCallNotSupported(true);
      setError("Unable to open dialer. Please call manually.");
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(`+91 ${phoneNumber}`);
    setCopied("Phone number copied to clipboard.");
  };

  return (
    <View>
      <Button
        onPress={
          callNotSupported ? handleCopy : () => handleCallUser(phoneNumber)
        }
      >
        <View style={styles.buttonContent}>
          {callNotSupported ? (
            <ClipboardCopy size={18} color={theme.color.white} />
          ) : (
            <Phone size={18} color={theme.color.white} />
          )}
          <Text
            style={{
              color: theme.color.white,
              fontSize: theme.fontSize._16,
            }}
          >
            {callNotSupported ? "Copy Number" : "Call"}
          </Text>
        </View>
      </Button>
      <LiftSnackBar
        visible={!!error}
        type="error"
        text={error}
        onDismiss={() => setError(null)}
        duration={2000}
      />
      <LiftSnackBar
        visible={!!copied}
        type="success"
        text={copied}
        onDismiss={() => setCopied(null)}
        duration={2000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
