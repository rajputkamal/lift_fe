import { Alert, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Button from "./Button";
import { colors } from "../constants/colors";

export default function CallUser({ phoneNumber, isOlderRide, isYourRide }) {
  const handleCallUser = (phoneNumber) => {
    if (!phoneNumber) {
      Alert.alert("No phone number", "This user does not have a phone number.");
      return;
    }

    let url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Error", "Your device cannot make calls");
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => Alert.alert("Error", err.message));
  };

  return (
    <Button
      onPress={() => handleCallUser(phoneNumber)}
      disabled={isOlderRide || isYourRide}
    >
      <Ionicons
        name="call-outline"
        size={18}
        color={isOlderRide || isYourRide ? colors.gray400 : colors.white}
      />
      Call
    </Button>
  );
}
