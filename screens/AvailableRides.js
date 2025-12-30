import { useState, useCallback, useMemo } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { CarFront } from "lucide-react-native";

import RideCard from "../components/RideCard";
import Title from "../components/Title";
import { fetchAvailableRides } from "../utils/api";
import { theme } from "../styles/theme";
import LiftSnackBar from "../components/LiftSnackbar";
import TabSwitcher from "../components/TabSwitcher";

export default function AvailableRides() {
  const [loading, setLoading] = useState(false);
  const [allRides, setAllRides] = useState([]);
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

  useFocusEffect(
    useCallback(() => {
      getAllRides();
      return () => {};
    }, [getAllRides])
  );

  const filteredRides = useMemo(
    () => allRides.filter((r) => r.vehicleType === vehicleType),
    [allRides, vehicleType]
  );

  return (
    <View style={styles.container}>
      <TabSwitcher vehicleType={vehicleType} setVehicleType={setVehicleType} />
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
          renderItem={({ item }) => <RideCard ride={item} />}
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
