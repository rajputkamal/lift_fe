import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";

import { theme } from "../styles/theme";
import CopyRight from "./CopyRight";

const FOOTER_LINKS = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/lift-%E2%80%93-ride-sharing-app/?viewAsMember=true",
  },
  {
    label: "Privacy Policy",
    url: "https://light-socks-c6d.notion.site/Privacy-Policy-Lift-2cdddcec27cb80d28575e5c0146a5f64?pvs=73",
  },
];

export default function Footer() {
  const handlePress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  return (
    <View style={styles.footerContainer}>
      <View style={styles.link}>
        {FOOTER_LINKS.map((link, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(link.url)}>
            <Text style={styles.linkText}>{link.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <CopyRight />
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: "auto",
    alignItems: "center",
  },
  link: {
    flexDirection: "row",
  },
  linkText: {
    fontSize: theme.fontSize._12,
    color: theme.color.purple600,
    cursor: "pointer",
    textAlign: "center",
    borderRightColor: theme.color.purple600,
    borderRightWidth: 1,
    paddingHorizontal: theme.spacing.xs,
  },
});
