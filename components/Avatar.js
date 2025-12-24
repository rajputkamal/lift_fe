import { View, Image, StyleSheet, Text } from "react-native";
import { CircleUserRound } from "lucide-react-native";

import { colors } from "../constants/colors";

export default function Avatar({ uri, name, size = 42 }) {
  const getInitials = (fullName) => {
    if (!fullName) return <CircleUserRound size={24} color={colors.gray900} />;
    const parts = fullName.trim().split(" ");
    const first = parts[0]?.[0]?.toUpperCase() || "";
    const last =
      parts.length > 1 ? parts[parts.length - 1]?.[0]?.toUpperCase() : "";
    return first + last;
  };

  const initials = getInitials(name);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[
            styles.image,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
          resizeMode="cover"
        />
      ) : (
        <Text style={[styles.initials, { fontSize: size / 2.5 }]}>
          {initials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray200,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  initials: {
    color: colors.gray900,
  },
});
