import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../constants/colors";
import Card from "./Card";
import Avatar from "./Avatar";
import CallUser from "./CallUser";

export default function RideCard({ ride }) {
  return (
    <Card>
      {/* Header Section */}
      <View>
        <View style={styles.header}>
          <Avatar uri={ride?.userImage} />
          <View>
            <Text style={styles.userName}>{ride?.userName}</Text>
            <Text style={styles.rating}>
              {/* ⭐ {ride?.rating ?? "4.8"}    //TODO:: Add rating later |{" "}  */}
              {ride?.vehicle}
            </Text>
          </View>
        </View>
      </View>

      {/* Route Info */}
      <View style={styles.route}>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={18} color={colors.primary} />
          <Text style={styles.locationText}>{ride.origin}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.locationRow}>
          <Ionicons name="flag-outline" size={18} color={colors.primary} />
          <Text style={styles.locationText}>{ride.destination}</Text>
        </View>
      </View>

      {/* Price and Time Info */}
      <View style={styles.detailsRow}>
        <Text style={styles.price}>₹{ride.price}</Text>
        <Text style={styles.time}>{ride.time}</Text>
      </View>

      <CallUser phoneNumber={ride?.phoneNumber} />
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
  },
  rating: {
    fontSize: 13,
    color: colors.gray400,
    marginTop: 2,
  },
  route: {
    marginVertical: 8,
    paddingLeft: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  locationText: {
    fontSize: 14,
    marginLeft: 6,
    color: colors.gray900,
  },
  line: {
    height: 14,
    width: 2,
    backgroundColor: colors.gray400,
    marginLeft: 8,
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  time: {
    fontSize: 13,
    color: colors.gray400,
  },
});
