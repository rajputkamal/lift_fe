import { Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <Image source={require("../assets/logo_lift.png")} style={styles.logo} />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 54,
    resizeMode: "contain",
  },
});
