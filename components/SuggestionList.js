import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { theme } from "../styles/theme";
import List from "./List";

export default function SuggestionList({ suggestions, onPress }) {
  return (
    <View style={styles.suggestionsContainer}>
      <Text style={styles.suggestionTitle}>Suggestions List</Text>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item)}>
            <List description={item.description} />
          </TouchableOpacity>
        )}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  suggestionsContainer: {
    maxHeight: 180,
    marginBottom: theme.spacing.md,
    borderTopColor: theme.color.gray300,
    borderTopWidth: 1,
    overflow: "hidden",
  },

  suggestionTitle: {
    fontSize: theme.fontSize._16,
    fontWeight: theme.weight.semi,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    color: theme.color.gray900,
  },
});
