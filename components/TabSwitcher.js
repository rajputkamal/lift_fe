import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
} from "react-native";
import { CarFront, Bike, AlarmClockCheck } from "lucide-react-native";
import { theme } from "../styles/theme";

const TAB_CONFIG = {
  main: [
    { key: "car", label: "Car", Icon: CarFront },
    { key: "bike", label: "Bike", Icon: Bike },
  ],
  rides: [
    { key: "active", label: "Active", Icon: CarFront },
    { key: "completed", label: "Completed", Icon: AlarmClockCheck },
  ],
};

export default function TabSwitcher({
  mode = "main",
  type = "car",
  setType,
  setSeats,
}) {
  const tabs = TAB_CONFIG[mode] ?? TAB_CONFIG.main;

  const handlePress = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (key === "bike") {
      setSeats?.(1);
    }

    setType(key);
  };

  return (
    <View style={styles.container}>
      {tabs.map(({ key, label, Icon }) => {
        const isActive = type === key;
        const color = isActive ? theme.color.gray900 : theme.color.gray600;

        return (
          <TouchableOpacity
            key={key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => handlePress(key)}
            activeOpacity={0.8}
          >
            <View style={styles.content}>
              <Icon size={16} color={color} />
              <Text style={[styles.label, { color }]}>{label}</Text>
            </View>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.x_lg,
  },
  activeTab: {
    backgroundColor: theme.color.gray300,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.fontSize._14,
    fontWeight: theme.weight.medium,
  },
});
