import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";

import RideCard from "../components/RideCard";
import Title from "../components/Title";
import { fetchAvailableRides } from "../utils/api";

export default function AvailableRides() {
  const [allRides, setAllRides] = useState([]);

  useEffect(() => {
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

    getAllRides();
  }, []);

  return (
    <View style={styles.container}>
      <Title>Available Rides</Title>

      <FlatList
        data={allRides}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <RideCard ride={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
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
});
