import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { colors } from "../constants/colors";
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
    marginBottom: 12,
    borderTopColor: colors.gray300,
    borderTopWidth: 1,
    overflow: "hidden",
  },

  suggestionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 8,
    color: colors.gray900,
  },
});
