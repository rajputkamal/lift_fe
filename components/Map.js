import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { colors } from "../constants/colors";
import { GOOGLE_MAPS_API_KEY } from "../constants/googleMap";

export default function Map({ originCoords, destinationCoords }) {
  const region = {
    latitude: originCoords?.latitude || 17.385044,
    longitude: originCoords?.longitude || 78.486671,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <MapView style={styles.map} region={region}>
      {originCoords && (
        <Marker coordinate={originCoords} title="Origin" pinColor="green" />
      )}

      {destinationCoords && (
        <Marker
          coordinate={destinationCoords}
          title="Destination"
          pinColor="red"
        />
      )}

      {originCoords && destinationCoords && (
        <MapViewDirections
          origin={originCoords}
          destination={destinationCoords}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={4}
          strokeColor={colors.blue600}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
