import { useState } from "react";

import { Alert, Linking, Platform, Text, View, StyleSheet } from "react-native";
import { Phone, ClipboardCopy } from "lucide-react-native";
import * as Clipboard from "expo-clipboard";

import Button from "./Button";
import { colors } from "../constants/colors";

export default function CallUser({ phoneNumber, isOlderRide, isYourRide }) {
  const [callNotSupported, setCallNotSupported] = useState(false);

  const handleCallUser = async (phoneNumber) => {
    if (isOlderRide) {
      Alert.alert(
        "Ride Completed",
        "This ride has already ended. You can only call users for active or upcoming rides."
      );
      return;
    }

    if (!phoneNumber) {
      Alert.alert("No phone number", "This user does not have a phone number.");
      return;
    }

    const url =
      Platform.OS === "ios" ? `telprompt:${phoneNumber}` : `tel:${phoneNumber}`;

    try {
      const supported = await Linking.canOpenURL(url);

      if (!supported) {
        Alert.alert(
          "Calling not supported",
          "Your device cannot make phone calls."
        );
        setCallNotSupported(true);
        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      setCallNotSupported(true);
      Alert.alert(
        "Call failed",
        "Unable to open dialer. Please call manually."
      );
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(`+91 ${phoneNumber}`);
    Alert.alert("Copied!", "Phone number copied to clipboard.");
  };

  return (
    <Button
      onPress={
        callNotSupported ? handleCopy : () => handleCallUser(phoneNumber)
      }
      disabled={isYourRide}
    >
      <View style={styles.buttonContent}>
        {callNotSupported ? (
          <ClipboardCopy
            size={18}
            color={isYourRide ? colors.gray400 : colors.white}
          />
        ) : (
          <Phone size={18} color={isYourRide ? colors.gray400 : colors.white} />
        )}
        <Text
          style={{
            color: isYourRide ? colors.gray400 : colors.white,
            fontSize: 16,
          }}
        >
          {callNotSupported ? "Copy Number" : "Call"}
        </Text>
      </View>
    </Button>
  );
}

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
