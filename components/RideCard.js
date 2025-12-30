import { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  MapPin,
  Flag,
  IndianRupee,
  EllipsisVertical,
} from "lucide-react-native";

import UserContext from "../context/UserContext";
import { theme } from "../styles/theme";
import Card from "./Card";
import Avatar from "./Avatar";
import CallUser from "./CallUser";
import Time from "./Time";

export default function RideCard({ ride }) {
  const { user } = useContext(UserContext);
  const [isOlderRide, setIsOlderRide] = useState(false);

  const isYourRide = user?.phoneNumber === ride?.userNumber;

  return (
    <Card>
      <View>
        <View style={styles.header}>
          <Avatar uri={ride?.userImage} name={ride?.userName} />
          <View>
            <Text style={styles.userName}>
              {ride?.userName}
              {isYourRide && " (You)"}
            </Text>
            <Text style={styles.rating}>
              ⭐ {ride?.rating ?? "4.8"} |{" "}
              {ride?.vehicleNumber ? ride.vehicleNumber : "Vehicle info not available"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.route}>
        <View style={styles.locationRow}>
          <MapPin size={18} color={theme.color.gray900} />
          <Text style={styles.locationText}>{ride.origin}</Text>
        </View>
        <EllipsisVertical size={18} color={theme.color.gray900} />
        <View style={styles.locationRow}>
          <Flag size={18} color={theme.color.gray900} />
          <Text style={styles.locationText}>{ride.destination}</Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.price}>
          <IndianRupee size={14} strokeWidth={3} />
          {ride.price}
        </Text>
        <Time
          time={ride?.time}
          setIsOlderRide={setIsOlderRide}
          seats={ride?.seatsAvailable}
        />
      </View>
      <CallUser
        phoneNumber={ride?.userNumber}
        isOlderRide={isOlderRide}
        isYourRide={isYourRide}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userName: {
    fontSize: theme.fontSize._16,
    fontWeight: theme.weight.semi,
    textTransform: "capitalize",
  },
  rating: {
    fontSize: theme.fontSize._12,
    color: theme.color.gray400,
    marginTop: 2,
  },
  route: {
    marginVertical: 6,
    paddingLeft: theme.spacing.xs,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: theme.fontSize._14,
    marginLeft: 6,
    color: theme.color.gray900,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.xs,
  },
  price: {
    fontSize: theme.fontSize._16,
    fontWeight: theme.weight.semi,
    color: theme.color.primary,
  },
});
