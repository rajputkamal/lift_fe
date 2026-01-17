import { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";

import { getToken, deleteToken } from "../utils/identity";
import { validate } from "../apis/auth";

export default function Splash({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const logout = async () => {
    await deleteToken();
    navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
  };

  useEffect(() => {
    async function checkLogin() {
      const token = await getToken();

      if (!token) {
        await logout();
      } else {
        try {
          const userData = await validate(token);
          if (userData.isUserExists) {
            navigation.replace("map");
          } else {
            await logout();
          }
        } catch (error) {
          await logout();
        }
      }
    }
    checkLogin();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[
          styles.image,
          {
            opacity: fadeAnim,
          },
        ]}
        source={require("../assets/splash-icon.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 74,
  },
});
