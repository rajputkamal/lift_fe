import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import * as Location from "expo-location";

import Card from "../components/Card";
import { colors } from "../constants/colors";
import Button from "../components/Button";
import Map from "../components/Map";
import SuggestionList from "../components/SuggestionList";
import { GOOGLE_MAPS_API_KEY } from "../constants/googleMap";
import TimePicker from "../components/TimePicker";
import Seats from "../components/Seats";

export default function Home() {
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

  const onContinue = () => {
    if (!origin || !destination)
      return Alert.alert("Missing info", "Please enter origin and destination");
    if (!time) return Alert.alert("Missing info", "Please enter ride time");
    if (!seats || parseInt(seats) <= 0)
      return Alert.alert("Invalid seats", "Please enter valid number of seats");

    console.log({
      origin,
      destination,
      originCoords,
      destinationCoords,
      time,
      seats,
    });
  };

  const onChangeTextHandler = (text, field) => {
    setActiveField(field);
    if (field === "origin") setOrigin(text);
    else setDestination(text);
    fetchPlaces(text);
  };

  useEffect(() => {
    (async () => {
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

        setOrigin(formattedAddress.trim());
        setOriginCoords({ latitude, longitude });

        console.log("Current location:", formattedAddress);
      } catch (err) {
        console.error("Error fetching location:", err);
      }
    })();
  }, []);

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
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => onChangeTextHandler(text, "origin")}
                onFocus={() => setActiveField("origin")}
                value={origin}
                placeholder="Enter origin"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onFocus={() => setActiveField("destination")}
                onChangeText={(text) =>
                  onChangeTextHandler(text, "destination")
                }
                value={destination}
                placeholder="Enter destination"
              />
            </View>

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
              <Button onPress={onContinue} disabled={!origin || !destination}>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 10,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: colors.gray900,
  },
  timeSeatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
});
