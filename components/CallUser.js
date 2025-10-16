import { Alert, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Button from "./Button";

export default function CallUser({ phoneNumber }) {
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
    <Button onPress={() => handleCallUser(phoneNumber)}>
      <Ionicons name="call-outline" size={18} color="#fff" />
      Call
    </Button>
  );
}
