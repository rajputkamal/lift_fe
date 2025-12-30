import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

import { theme } from "../styles/theme";
import LiftSnackBar from "./LiftSnackbar";

export default function PriceSelector({ minPrice, maxPrice, onPriceChange }) {
  const [error, setError] = useState(null);
  const defaultPrice = Math.round((minPrice + maxPrice) / 2);
  const [price, setPrice] = useState(defaultPrice);
  const [inputValue, setInputValue] = useState(String(defaultPrice));

  useEffect(() => {
    setPrice(defaultPrice);
    setInputValue(String(defaultPrice));
  }, [minPrice, maxPrice]);

  const handleSlider = (v) => {
    setPrice(v);
    setInputValue(String(v));
    setError(null);
    onPriceChange?.(v);
  };

  const handleInput = (text) => {
    if (text === "") {
      setInputValue("");
      setError(null);
      onPriceChange?.(null);
      return;
    }

    if (!/^\d+$/.test(text)) return;

    const numeric = Number(text);
    setInputValue(text);

    if (numeric < minPrice || numeric > maxPrice) {
      setError(`Price must be between ₹${minPrice} and ₹${maxPrice}`);
      onPriceChange?.(null);
      return;
    }

    setError(null);
    setPrice(numeric);
    onPriceChange?.(numeric);
  };

  const handleInputBlur = () => {
    if (inputValue === "") {
      setInputValue(String(price));
      setError(null);
      onPriceChange?.(price);
    }
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
            // minimumTrackTintColor={theme.color.purple600}
            // thumbTintColor={theme.color.purple600}
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
        <LiftSnackBar
          visible={!!error}
          type="error"
          text={error}
          onDismiss={() => setError(null)}
          duration={2000}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderTopColor: theme.color.gray200,
    borderTopWidth: 1,
    marginBottom: theme.spacing.sm,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  sliderCol: {
    flex: 7,
    paddingRight: theme.spacing.sm,
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
    fontSize: theme.fontSize._12,
    color: theme.color.gray900,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    backgroundColor: theme.color.gray200,
    borderRadius: theme.borderRadius.sm,
  },

  currency: {
    fontSize: theme.fontSize._16,
    fontWeight: theme.weight.medium,
    color: theme.color.gray900,
    marginRight: 2,
  },

  input: {
    fontSize: theme.fontSize._16,
    fontWeight: theme.weight.medium,
    color: theme.color.gray900,
    textAlign: "center",
    padding: 0,
    minWidth: 36,
  },
});
