import { View, Image, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from "../constants/colors";

export default function Avatar({ uri, size = 50 }) {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
          resizeMode="cover"
        />
      ) : (
        <Ionicons name="person-circle-outline" size={24} color="black" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray400,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
