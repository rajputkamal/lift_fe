import { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";

import Card from "../components/Card";
import Button from "../components/Button";
import Map from "../components/Map";
import SuggestionList from "../components/SuggestionList";
import { GOOGLE_MAPS_API_KEY } from "../constants/googleMap";
import TimePicker from "../components/TimePicker";
import Seats from "../components/Seats";
import LiftInput from "../components/LiftInput";
import { requestRide } from "../utils/api";

export default function Home({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date());
  const [seats, setSeats] = useState(3);

  const [suggestions, setSuggestions] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState("origin");
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  const fetchPlaces = async (input) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      setSuggestions(data.predictions || []);
    } catch (error) {
      Alert.alert("Error fetching places", error.message);
    }
  };

  const getCoordinatesFromAddress = async (address, type) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        if (type === "origin")
          setOriginCoords({ latitude: lat, longitude: lng });
        else setDestinationCoords({ latitude: lat, longitude: lng });
      }
    } catch (err) {
      Alert.alert("Error getting coordinates", err.message);
    }
  };

  const handlePlaceSelect = (place) => {
    if (activeField === "origin") {
      setOrigin(place.description);
      getCoordinatesFromAddress(place.description, "origin");
    } else {
      setDestination(place.description);
      getCoordinatesFromAddress(place.description, "destination");
    }
    setSuggestions([]);
    Keyboard.dismiss();
  };

  const onContinue = async () => {
    if (!origin || !destination)
      return Alert.alert("Missing info", "Please enter origin and destination");
    if (!time) return Alert.alert("Missing info", "Please enter ride time");
    if (!seats || parseInt(seats) <= 0)
      return Alert.alert("Invalid seats", "Please enter valid number of seats");

    setLoading(true);
    const result = await requestRide({
      origin,
      destination,
      originCoords,
      destinationCoords,
      time,
      seatsAvailable: seats,
    });

    if (result?.message) {
      Alert.alert("Success", "Your ride has been offered successfully.");
      navigation.navigate("Rides");
      setOrigin("");
      setDestination("");
      setOriginCoords(null);
      setDestinationCoords(null);
      setTime(new Date());
      setSeats(3);
    } else {
      Alert.alert("Error", "Could not offer ride. Please try again later.");
    }
    setLoading(false);
  };

  const onChangeTextHandler = (text, field) => {
    setActiveField(field);
    if (field === "origin") setOrigin(text);
    else setDestination(text);
    fetchPlaces(text);
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchLocation = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.warn("Permission to access location was denied");
            return;
          }

          const currentLocation = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = currentLocation.coords;

          const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });

          const address = reverseGeocode[0];
          const formattedAddress = `${address.name || ""} ${
            address.street || ""
          }, ${address.city || ""}, ${address.region || ""}`;

          if (isActive) {
            setOrigin(formattedAddress.trim());
            setOriginCoords({ latitude, longitude });
          }
        } catch (err) {
          console.error("Error fetching location:", err);
        }
      };

      fetchLocation();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Map
            originCoords={originCoords}
            destinationCoords={destinationCoords}
          />

          <Card style={{ paddingBottom: Platform.OS === "ios" ? 30 : 16 }}>
            <LiftInput
              onChangeText={(text) => onChangeTextHandler(text, "origin")}
              onFocus={() => setActiveField("origin")}
              value={origin}
              placeholder="Your location"
              onPressCloseIcon={() => setOrigin("")}
            />

            <LiftInput
              onFocus={() => setActiveField("destination")}
              onChangeText={(text) => onChangeTextHandler(text, "destination")}
              value={destination}
              placeholder="Where to?"
              onPressCloseIcon={() => setDestination("")}
            />

            <View style={styles.timeSeatsContainer}>
              <TimePicker time={time} setTime={setTime} />
              <Seats seats={seats} setSeats={setSeats} />
            </View>

            {suggestions.length > 0 && (
              <SuggestionList
                suggestions={suggestions}
                onPress={handlePlaceSelect}
              />
            )}

            <View style={styles.buttonContainer}>
              <Button
                onPress={onContinue}
                disabled={!origin || !destination}
                loading={loading}
              >
                Offer Ride
              </Button>
            </View>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  timeSeatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
});
