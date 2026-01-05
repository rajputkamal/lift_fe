import { useState, useCallback, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";

import Card from "../components/Card";
import Button from "../components/Button";
import Map from "../components/Map";
import SuggestionList from "../components/SuggestionList";
import TimePicker from "../components/TimePicker";
import Seats from "../components/Seats";
import LiftInput from "../components/LiftInput";
import { requestRide, updateRide } from "../apis/ride.js";
import UserContext from "../context/UserContext";
import LiftSnackBar from "../components/LiftSnackbar";
import TabSwitcher from "../components/TabSwitcher";
import PriceSelector from "../components/PriceSelector";
import { calculatePrice } from "../utils/price";
import { theme } from "../styles/theme";

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function Home({ route, navigation }) {
  const { user } = useContext(UserContext);
  const { editableRide } = route?.params || {};

  const [loading, setLoading] = useState(false);

  // ride state and state handler functions
  const [vehicleType, setVehicleType] = useState("car");
  const [origin, setOrigin] = useState("");

  const [originCoords, setOriginCoords] = useState(null);
  const [destination, setDestination] = useState("");

  const [destinationCoords, setDestinationCoords] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [seats, setSeats] = useState(1);

  //sate to add input focus effect
  const [activeField, setActiveField] = useState("origin");

  const [suggestions, setSuggestions] = useState([]);

  //state to display the Snackbar
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [info, setInfo] = useState(null);

  // state to handle the ride price, priceRange and distance
  const [priceRange, setPriceRange] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [distance, setDistance] = useState(0);

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
      setError("Error fetching places");
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
      setError("Error getting coordinates");
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

  const resetForm = () => {
    setOrigin("");
    setDestination("");
    setOriginCoords(null);
    setDestinationCoords(null);
    setDateTime(new Date());
    setSeats(1);
    setDistance(0);
    setPriceRange(null);
    setSelectedPrice(null);
  };

  const onContinue = async () => {
    if (!user?.name) {
      setInfo(
        "To offer or book rides smoothly, we recommend adding your name to your profile."
      );
      return;
    }

    const payload = {
      origin,
      destination,
      originCoords,
      destinationCoords,
      time: dateTime,
      seatsAvailable: seats,
      price: selectedPrice,
      distance,
      vehicleType,
    };

    setLoading(true);

    try {
      let result;

      if (editableRide) {
        result = await updateRide({
          rideId: editableRide._id,
          ...payload,
        });

        if (!result?.success) {
          throw new Error("Could not update ride. Please try again.");
        }

        setSuccess("Your ride has been updated successfully.");
      } else {
        result = await requestRide(payload);

        if (!result?.message) {
          throw new Error("Could not offer ride. Please try again.");
        }

        setSuccess("Your ride has been offered successfully.");
      }

      resetForm();

      setTimeout(() => {
        setSuccess(null);
        navigation.navigate("Rides");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(
        editableRide
          ? "Could not update ride. Please try again."
          : "Could not offer ride. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const onChangeTextHandler = (text, field) => {
    setActiveField(field);
    if (field === "origin") setOrigin(text);
    else setDestination(text);
    fetchPlaces(text);
  };

  const closeIconHandler = (field) => {
    if (field === "origin") {
      setOrigin("");
      setOriginCoords(null);
      setPriceRange(null);
      setSelectedPrice(null);
    } else {
      setDestination("");
      setDestinationCoords(null);
      setPriceRange(null);
      setSelectedPrice(null);
    }
  };

  useEffect(() => {
    if (originCoords && destinationCoords && vehicleType) {
      (async () => {
        const result = await calculatePrice(
          originCoords,
          destinationCoords,
          vehicleType
        );

        const { distance, priceRange } = result;
        setPriceRange(priceRange);
        setDistance(distance);
        const mid = Math.round(
          (result.priceRange.min + result.priceRange.max) / 2
        );
        setSelectedPrice(mid);
      })();
    }
  }, [originCoords, destinationCoords, vehicleType, editableRide]);

  useFocusEffect(
    useCallback(() => {
      if (editableRide) return;
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
    }, [editableRide])
  );

  useFocusEffect(
    useCallback(() => {
      setDateTime(new Date());
    }, [])
  );

  useEffect(() => {
    if (!editableRide) return;

    setOrigin(editableRide.origin);
    setDestination(editableRide.destination);
    setOriginCoords(editableRide.originCoords);
    setDestinationCoords(editableRide.destinationCoords);
    setDateTime(new Date(editableRide.time));
    setSeats(editableRide.seatsAvailable);
    setVehicleType(editableRide.vehicleType);
    setSelectedPrice(editableRide.price);
    setDistance(editableRide.distance);
  }, [editableRide]);

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

          <TabSwitcher
            vehicleType={vehicleType}
            setVehicleType={setVehicleType}
            setSeats={setSeats}
          />
          <Card style={{ paddingBottom: Platform.OS === "ios" ? 30 : 16 }}>
            <LiftInput
              onChangeText={(text) => onChangeTextHandler(text, "origin")}
              onFocus={() => setActiveField("origin")}
              value={origin}
              placeholder="Your location"
              onPressCloseIcon={() => closeIconHandler("origin")}
            />

            <LiftInput
              onFocus={() => setActiveField("destination")}
              onChangeText={(text) => onChangeTextHandler(text, "destination")}
              value={destination}
              placeholder="Where to?"
              onPressCloseIcon={() => closeIconHandler("destination")}
            />

            <View style={styles.timeSeatsContainer}>
              <TimePicker dateTime={dateTime} setDateTime={setDateTime} />
              <Seats
                seats={seats}
                setSeats={setSeats}
                vehicleType={vehicleType}
              />
            </View>

            {priceRange && (
              <PriceSelector
                minPrice={priceRange.min}
                maxPrice={priceRange.max}
                onPriceChange={setSelectedPrice}
              />
            )}

            {suggestions.length > 0 && (
              <SuggestionList
                suggestions={suggestions}
                onPress={handlePlaceSelect}
              />
            )}

            <View style={styles.buttonContainer}>
              <Button
                onPress={onContinue}
                disabled={!origin || !destination || selectedPrice == null}
                loading={loading}
              >
                {editableRide ? "Update Ride" : " Offer Ride"}
              </Button>
            </View>
          </Card>
          <LiftSnackBar visible={!user?.name} />
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
          <LiftSnackBar
            visible={!!info}
            type="info"
            text={info}
            onDismiss={() => setInfo(null)}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xs,
  },
  timeSeatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
});
