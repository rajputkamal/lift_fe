import { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import RideCard from "../components/RideCard";
import Title from "../components/Title";
import { fetchAvailableRides } from "../utils/api";
import { colors } from "../constants/colors";

export default function AvailableRides() {
  const [allRides, setAllRides] = useState([]);

  async function getAllRides() {
    const results = await fetchAvailableRides();
    if (results?.rides) {
      setAllRides(results.rides);
    } else {
      Alert.alert(
        "Error",
        "Could not fetch available rides. Please try again later."
      );
    }
  }

  useFocusEffect(() => {
    // useCallback(() => {
    getAllRides();
    // }, []);
  });

  return (
    <View style={styles.container}>
      <Title>Available Rides</Title>
      {allRides.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.gray900} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
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
