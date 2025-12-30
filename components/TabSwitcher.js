import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import { CarFront, Bike } from "lucide-react-native";

import { theme } from "../styles/theme";

const TABS = [
  {
    key: "car",
    label: "Car",
    icon: <CarFront size={16} color={theme.color.gray900} />,
  },
  {
    key: "bike",
    label: "Bike",
    icon: <Bike size={16} color={theme.color.gray900} />,
  },
];

export default function TabSwitcher({
  vehicleType = "car",
  setVehicleType,
  setSeats,
}) {
  const handlePress = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (key === "bike") {
      setSeats && setSeats(1);
    }
    setVehicleType(key);
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = vehicleType === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => handlePress(tab.key)}
            activeOpacity={0.8}
          >
            {tab.icon && <View style={styles.icon}>{tab.icon}</View>}
            {tab.label && <Text style={styles.label}>{tab.label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.color.white,
    borderRadius: theme.borderRadius.x_lg,
    padding: theme.spacing.xs,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.x_lg,
    width: "50%",
  },
  activeTab: {
    backgroundColor: theme.color.gray300,
  },
  icon: {
    marginRight: theme.spacing.xs,
  },
  label: {
    fontSize: theme.fontSize._14,
    color: theme.color.gray900,
    fontWeight: theme.weight.medium,
  },
});
