import { useState, useCallback, useMemo, useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { CarFront } from "lucide-react-native";

import RideCard from "../components/RideCard";
import Title from "../components/Title";
import { fetchAvailableRides, deleteRide } from "../apis/ride.js";
import { theme } from "../styles/theme";
import LiftSnackBar from "../components/LiftSnackbar";
import TabSwitcher from "../components/TabSwitcher";
import UserContext from "../context/UserContext.js";

export default function AvailableRides({ navigation }) {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loadingRideDeletion, setLoadingRideDeletion] = useState(false);
  const [deletingRideId, setDeletingRideId] = useState(null);
  const [allRides, setAllRides] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [vehicleType, setVehicleType] = useState("car");

  const getAllRides = useCallback(async () => {
    setLoading(true);
    const results = await fetchAvailableRides();
    if (results?.rides) {
      setAllRides(results.rides ?? []);
    } else {
      setError("Could not fetch available rides. Please try again later.");
    }
    setLoading(false);
  }, []);

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
      { cancelable: true }
    );
  };

  const deleteRideHandler = async (rideId) => {
    setDeletingRideId(rideId);
    try {
      const result = await deleteRide(rideId);

      if (result?.success) {
        setAllRides((prevRides) =>
          prevRides.filter((ride) => ride._id !== rideId)
        );
        setSuccess("Your ride has been deleted successfully.");
      }
    } catch (error) {
      setError("Failed to delete ride. Please try again.");
    } finally {
      setDeletingRideId(null);
    }
  };

  const onUpdateRide = async (editableRide) => {
    navigation.navigate({
      name: "Map",
      params: { editableRide },
      merge: true,
    });
  };

  useFocusEffect(
    useCallback(() => {
      getAllRides();
      return () => {};
    }, [getAllRides])
  );

  const filteredRides = useMemo(() => {
    if (!user?._id) return [];

    if (vehicleType === "ride") {
      return allRides.filter((ride) => ride.userId === user?._id);
    }

    return allRides.filter(
      (ride) => ride.vehicleType === vehicleType && ride.userId !== user?._id
    );
  }, [allRides, vehicleType, user]);

  return (
    <View style={styles.container}>
      <TabSwitcher
        mode="rides"
        vehicleType={vehicleType}
        setVehicleType={setVehicleType}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.color.gray900} />
        </View>
      ) : !loading && filteredRides.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Title subHeading>
            No rides found. Try refreshing or check again later.
          </Title>
          <CarFront size={36} color={theme.color.gray400} />
        </View>
      ) : (
        <FlatList
          data={filteredRides}
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
    paddingVertical: theme.spacing.sm,
  },
  listContent: {
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
