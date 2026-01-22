import { useState, useCallback, useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ArrowRight } from "lucide-react-native";

import RideCard from "../components/RideCard";
import Title from "../components/Title";
import { deleteRide, fetchMyRides } from "../apis/ride.js";
import { theme } from "../styles/theme";
import LiftSnackBar from "../components/LiftSnackbar";
import TabSwitcher from "../components/TabSwitcher";
import UserContext from "../context/UserContext.js";

export default function MyRides({ navigation }) {
  const { refreshUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [deletingRideId, setDeletingRideId] = useState(null);
  const [allRides, setAllRides] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("active");

  const getAllRides = useCallback(async () => {
    setLoading(true);
    const results = await fetchMyRides(status);
    if (results?.rides) {
      setAllRides(results.rides ?? []);
    } else {
      setError("Could not fetch available rides. Please try again later.");
    }
    setLoading(false);
  }, [status]);

  const onDeleteRide = (rideId) => {
    Alert.alert(
      "Delete Ride?",
      "This ride will be permanently removed and will no longer be visible to other users. This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteRideHandler(rideId),
        },
      ],
      { cancelable: true },
    );
  };

  const deleteRideHandler = async (rideId) => {
    setDeletingRideId(rideId);
    try {
      const result = await deleteRide(rideId);

      if (result?.success) {
        setAllRides((prevRides) =>
          prevRides.filter((ride) => ride._id !== rideId),
        );
        refreshUser();
        setSuccess("Your ride has been deleted successfully.");
      }
    } catch (error) {
      setError("Failed to delete ride. Please try again.");
    } finally {
      setDeletingRideId(null);
    }
  };

  const onUpdateRide = async (editableRide, action) => {
    navigation.navigate({
      name: "Map",
      params: { editableRide, action },
      merge: true,
    });
  };

  useFocusEffect(
    useCallback(() => {
      getAllRides();
      return () => {};
    }, [getAllRides]),
  );

  return (
    <View style={styles.container}>
      <TabSwitcher mode="rides" type={status} setType={setStatus} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.color.gray900} />
        </View>
      ) : !loading && allRides.length === 0 ? (
        <View style={styles.loadingContainer}>
          {status === "active" ? (
            <View style={styles.emptyStateContainer}>
              <Title subHeading>
                You haven’t posted any rides yet. Start posting to see your
                rides here.
              </Title>
              <TouchableOpacity
                onPress={() => navigation.navigate("Map")}
                style={styles.hyperlinkContainer}
              >
                <Text style={styles.hyperlink}>Post a Ride</Text>
                <ArrowRight size={18} color={theme.color.purple600} />
              </TouchableOpacity>
            </View>
          ) : (
            <Title subHeading>
              No completed rides yet. Rides you post will appear here after they
              completed.
            </Title>
          )}
        </View>
      ) : (
        <FlatList
          data={allRides}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <RideCard
              ride={item}
              onDeleteRide={onDeleteRide}
              onUpdateRide={onUpdateRide}
              loadingRideDeletion={deletingRideId === item._id}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
      <LiftSnackBar
        visible={!!error}
        type="error"
        text={error}
        onDismiss={() => setError(null)}
      />
      <LiftSnackBar
        visible={!!success}
        type="success"
        text={success}
        onDismiss={() => setSuccess(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xs,
  },
  listContent: {
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hyperlinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  hyperlink: {
    color: theme.color.purple600,
    fontSize: theme.fontSize._16,
    fontWeight: theme.weight.medium,
  },
});
