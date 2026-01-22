import { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Heart } from "lucide-react-native";

import { theme } from "../styles/theme";

export default function FavoriteIcon() {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    // TODO:: API call to update favorite status
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity style={styles.favoriteIcon} onPress={toggleFavorite}>
      {isFavorite ? (
        <Heart color={theme.color.orange500} fill={theme.color.orange500} />
      ) : (
        <Heart color={theme.color.gray900} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  favoriteIcon: {
    marginLeft: "auto",
  },
});
