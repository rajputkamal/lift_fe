import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import { CarFront, Bike } from "lucide-react-native";

import { colors } from "../constants/colors";

const TABS = [
  {
    key: "bike",
    label: "Bike",
    icon: <Bike size={16} color={colors.gray900} />,
  },
  {
    key: "car",
    label: "Car",
    icon: <CarFront size={16} color={colors.gray900} />,
  },
];

export default function TabSwitcher({ onChange }) {
  const [activeTab, setActiveTab] = useState(TABS[0].key);

  const handlePress = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveTab(key);
    onChange && onChange?.(key);
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;

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
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 4,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    width: "50%",
  },
  activeTab: {
    backgroundColor: colors.gray300,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    color: colors.gray900,
    fontWeight: "500",
  },
});
