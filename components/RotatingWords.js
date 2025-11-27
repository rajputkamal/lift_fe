import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

const RotatingWords = () => {
  const words = ["Lift together.", "Save together.", "Ride together."];
  const [index, setIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.delay(1200),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIndex((prev) => (prev + 1) % words.length);
      });
    };

    animate();
  }, [index]);

  return (
    <Animated.Text style={[styles.animatedText, { opacity: fadeAnim }]}>
      {words[index]}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  animatedText: {
    color: colors.blue600,
    fontSize: 22,
    fontWeight: "600",
    // marginTop: 10,
    textAlign: "center",
  },
});

export default RotatingWords;
