import { View, FlatList, StyleSheet } from "react-native";

import RideCard from "../components/RideCard";
import Title from "../components/Title";

export default function AvailableRides() {
  const rides = [
    {
      id: "1",
      userName: "Rahul Sharma",
      origin: "Hitech City",
      destination: "Banjara Hills",
      price: 120,
      time: "Today, 5:30 PM",
      vehicle: "Maruti Baleno - TS09AB1234",
      phoneNumber: "9876543210",
    },
    {
      id: "2",
      userName: "Aditi Verma",
      userImage: "https://i.pravatar.cc/100?img=9",
      origin: "Madhapur",
      destination: "Gachibowli",
      price: 80,
      time: "Today, 6:00 PM",
      vehicle: "Honda City - TS10CD5678",
    },
    {
      id: "3",
      userName: "Sanjay Rao",
      userImage: "https://i.pravatar.cc/100?img=13",
      origin: "Kukatpally",
      destination: "Kondapur",
      price: 100,
      time: "Today, 6:45 PM",
      vehicle: "Hyundai i20 - TS07XY3456",
    },
  ];

  const handleRequestRide = (ride) => {
    console.log("Requesting ride with", ride.userName);
    // here you can navigate to booking screen or show confirmation modal
  };

  const handleCallUser = (ride) => {
    console.log("Calling", ride.userName);
    // You can integrate Linking.openURL(`tel:${ride.phone}`)
  };

  return (
    <View style={styles.container}>
      <Title>Available Rides</Title>

      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RideCard
            ride={item}
            onRequestRide={() => handleRequestRide(item)}
            onCallUser={() => handleCallUser(item)}
          />
        )}
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
    paddingVertical: 16
  },
  listContent: {
    paddingBottom: 30,
  },
});
