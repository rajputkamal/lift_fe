import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

import { colors } from "../constants/colors";

export default function PriceSelector({
  minPrice = 40,
  maxPrice = 100,
  onPriceChange,
}) {
  const defaultPrice = Math.round((minPrice + maxPrice) / 2);
  const [price, setPrice] = useState(defaultPrice);

  useEffect(() => {
    setPrice(defaultPrice);
  }, [minPrice, maxPrice]);

  const handleInputChange = (value) => {
    const numeric = Number(value.replace(/[^0-9]/g, ""));
    const clamped = Math.min(Math.max(numeric || minPrice, minPrice), maxPrice);

    setPrice(clamped);
    onPriceChange?.(clamped);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderWrapper}>
        <Text style={styles.rangeText}>₹{minPrice}</Text>

        <View style={styles.sliderContainer}>
          <Slider
            minimumValue={minPrice}
            maximumValue={maxPrice}
            step={1}
            value={price}
            onValueChange={(v) => {
              setPrice(v);
              onPriceChange?.(v);
            }}
            minimumTrackTintColor={colors.purple600}
            maximumTrackTintColor={colors.gray900}
            thumbTintColor={colors.purple600}
          />
        </View>

        <Text style={styles.rangeText}>₹{maxPrice}</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.currency}>₹</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(price)}
            onChangeText={handleInputChange}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  sliderWrapper: {
    flex: 7,
    flexDirection: "row",
    alignItems: "center",
  },

  rangeText: {
    fontSize: 12,
    color: colors.gray900,
    textAlign: "center",
  },

  sliderContainer: {
    flex: 1,
  },

  inputContainer: {
    flex: 3,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray200,
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  currency: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray900,
    marginRight: 2,
    marginLeft: -10,
  },

  input: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray900,
    textAlign: "center",
    minWidth: 44,
    padding: 0,
  },
});
