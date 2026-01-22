import { useState, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { CarFront, RefreshCw } from "lucide-react-native";

import RideCard from "../components/RideCard";
import Title from "../components/Title";
import { fetchAvailableRides } from "../apis/ride.js";
import { theme } from "../styles/theme";
import LiftSnackBar from "../components/LiftSnackbar";
import TabSwitcher from "../components/TabSwitcher";

export default function AvailableRides({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [allRides, setAllRides] = useState([]);
  const [error, setError] = useState(null);
  const [vehicleType, setVehicleType] = useState("car");

  const getAllRides = useCallback(async () => {
    setLoading(true);
    const results = await fetchAvailableRides(vehicleType);
    if (results?.rides) {
      setAllRides(results.rides ?? []);
    } else {
      setError("Could not fetch available rides. Please try again later.");
    }
    setLoading(false);
  }, [vehicleType]);

  useFocusEffect(
    useCallback(() => {
      getAllRides();
      return () => {};
    }, [getAllRides]),
  );

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();

      parent?.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={getAllRides}
            style={{ marginRight: theme.spacing.lg }}
          >
            <RefreshCw size={22} color={theme.color.purple600} />
          </TouchableOpacity>
        ),
      });

      return () => {
        parent?.setOptions({ headerRight: undefined });
      };
    }, [navigation]),
  );

  return (
    <View style={styles.container}>
      <TabSwitcher type={vehicleType} setType={setVehicleType} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.color.gray900} />
        </View>
      ) : !loading && allRides.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Title subHeading>
            No rides found. Try refreshing or check again later.
          </Title>
          <CarFront size={36} color={theme.color.gray400} />
        </View>
      ) : (
        <FlatList
          data={allRides}
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
});
