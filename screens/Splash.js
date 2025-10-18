import { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import { getToken } from "../utils/identity";
import { colors } from "../constants/colors";

export default function Splash({ navigation }) {
  useEffect(() => {
    async function checkLogin() {
      const token = await getToken();
      if (token) {
        navigation.replace("map");
      } else {
        navigation.replace("login");
      }
    }
    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.gray900} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
