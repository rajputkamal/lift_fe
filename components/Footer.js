import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { theme } from "../styles/theme";
import CopyRight from "./CopyRight";
import { openURL } from "../utils/helper";
import { FOOTER_LINKS } from "../utils/constants";

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.link}>
        {FOOTER_LINKS.map((link, index) => {
          const isLast = index === FOOTER_LINKS.length - 1;
          return (
            <TouchableOpacity key={index} onPress={() => openURL(link.url)}>
              <Text style={[styles.linkText, !isLast && styles.withDivider]}>
                {link.label}
              </Text>
            </TouchableOpacity>
          );
        })}
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
    textAlign: "center",
    paddingHorizontal: theme.spacing.xs,
  },
  withDivider: {
    borderRightColor: theme.color.purple600,
    borderRightWidth: 1,
  },
});
