import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

import { colors } from "../constants/colors";

export default function PriceSelector({ minPrice, maxPrice, onPriceChange }) {
  const defaultPrice = Math.round((minPrice + maxPrice) / 2);
  const [price, setPrice] = useState(defaultPrice);
  const [inputValue, setInputValue] = useState(String(defaultPrice));

  useEffect(() => {
    setPrice(defaultPrice);
    setInputValue(String(defaultPrice));
  }, [minPrice, maxPrice]);

  const clamp = (v) => Math.min(Math.max(v, minPrice), maxPrice);

  const handleSlider = (v) => {
    setPrice(v);
    setInputValue(String(v));
    onPriceChange?.(v);
  };
  const handleInput = (text) => {
    if (text === "") {
      setInputValue("");
      return;
    }

    if (!/^\d+$/.test(text)) return;

    setInputValue(text);
  };

  const handleInputBlur = () => {
    let numeric = Number(inputValue);

    if (Number.isNaN(numeric)) {
      numeric = minPrice;
    }

    const clamped = clamp(numeric);
    setPrice(clamped);
    setInputValue(String(clamped));
    onPriceChange?.(clamped);
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.sliderCol}>
          <Slider
            minimumValue={minPrice}
            maximumValue={maxPrice}
            step={1}
            value={price}
            onValueChange={handleSlider}
            // minimumTrackTintColor={colors.purple600}
            // thumbTintColor={colors.purple600}
          />

          <View style={styles.rangeRow}>
            <Text style={styles.rangeText}>₹{minPrice} (min)</Text>
            <Text style={styles.rangeText}>₹{maxPrice} (max)</Text>
          </View>
        </View>

        <View style={styles.inputCol}>
          <View style={styles.inputBox}>
            <Text style={styles.currency}>₹</Text>
            <TextInput
              value={inputValue}
              onChangeText={handleInput}
              onBlur={handleInputBlur}
              keyboardType="numeric"
              style={styles.input}
              maxLength={4}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderTopColor: colors.gray200,
    borderTopWidth: 1,
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  sliderCol: {
    flex: 7,
    paddingRight: 8,
  },

  inputCol: {
    flex: 3,
  },

  rangeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -4,
  },

  rangeText: {
    fontSize: 11,
    color: colors.gray900,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    backgroundColor: colors.gray200,
    borderRadius: 8,
  },

  currency: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.gray900,
    marginRight: 2,
  },

  input: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.gray900,
    textAlign: "center",
    padding: 0,
    minWidth: 36,
  },
});
