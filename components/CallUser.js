import { useState } from "react";

import {
  Alert,
  Linking,
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Phone, ClipboardCopy } from "lucide-react-native";

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
      Alert.alert(
        "Call failed",
        "Unable to open dialer. Please call manually."
      );
    }
  };

  return (
    <Button onPress={() => handleCallUser(phoneNumber)} disabled={isYourRide}>
      <View style={styles.buttonContent}>
        <Phone size={18} color={isYourRide ? colors.gray400 : colors.white} />
        <Text
          style={{
            color: isYourRide ? colors.gray400 : colors.white,
            fontSize: 16,
          }}
        >
          Call
        </Text>
        {callNotSupported && (
          <View style={styles.buttonContent}>
            <ClipboardCopy size={18} color={colors.white} />
            <Text style={{ color: colors.white, fontSize: 16 }}>
              {/* +91 {phoneNumber} */}
              Copy Phone Number
            </Text>
            <TouchableOpacity
              onPress={() =>
                console.log("Copy phone number", `+91 ${phoneNumber}`)
              }
            ></TouchableOpacity>
          </View>
        )}
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
