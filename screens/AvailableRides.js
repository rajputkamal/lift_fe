import { useState, useCallback } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { CarFront } from "lucide-react-native";

import RideCard from "../components/RideCard";
import Title from "../components/Title";
import { fetchAvailableRides } from "../utils/api";
import { colors } from "../constants/colors";
import LiftSnackBar from "../components/LiftSnackbar";
import TabSwitcher from "../components/TabSwitcher";

export default function AvailableRides() {
  const [loading, setLoading] = useState(false);
  const [allRides, setAllRides] = useState([]);
  const [error, setError] = useState(null);

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

  const handleTabChange = (value) => {
    console.log("Ride type selected:", value);
  };

  useFocusEffect(
    useCallback(() => {
      getAllRides();
      return () => {};
    }, [getAllRides])
  );

  return (
    <View style={styles.container}>
      <TabSwitcher onChange={handleTabChange} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.gray900} />
        </View>
      ) : !loading && allRides.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Title subHeading>
            No rides found. Try refreshing or check again later.
          </Title>
          <CarFront size={36} color={colors.gray400} />
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
    paddingHorizontal: 16,
    paddingVertical: 8,
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
