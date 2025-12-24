import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Pencil, Check } from "lucide-react-native";
import * as Application from "expo-application";

import { colors } from "../constants/colors";
import Card from "../components/Card";
import Title from "../components/Title";
import { deleteToken } from "../utils/identity";
import { updateProfile } from "../utils/api";
import UserContext from "../context/UserContext";
import Footer from "../components/Footer";

export default function ProfileSettingsScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [editing, setEditing] = useState(false);

  const nameChangeHandler = (text) => setName(text);

  const handleSave = async () => {
    const trimmed = name.trim();
    const hasInvalidChars = /[^a-zA-Z\s]/.test(trimmed);

    if (trimmed.length === 0) {
      Alert.alert("Invalid Name", "Name cannot be empty.");
      return;
    }
    if (trimmed.length > 32) {
      Alert.alert("Invalid Name", "Name cannot exceed 32 characters.");
      return;
    }
    if (hasInvalidChars) {
      Alert.alert("Invalid Name", "Name cannot contain special characters.");
      return;
    }

    try {
      setLoading(true);
      const result = await updateProfile({ name: trimmed });
      if (!result || !result.user) {
        Alert.alert("Error", "Failed to update profile. Please try again.");
        return;
      }
      setUser({ ...user, name: result.user.name });
      Alert.alert(
        "Profile Updated!",
        "Your name has been updated successfully."
      );
      setEditing(false);
    } catch (err) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await deleteToken();
    navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
  };

  return (
    <View style={styles.container}>
      <Title>Profile Settings</Title>

      <Card>
        <View style={styles.nameContainer}>
          <View>
            <Text style={styles.label}>Name</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={nameChangeHandler}
                autoFocus
                placeholder="Enter your name"
                placeholderTextColor={colors.gray400}
                autoCorrect={false}
                maxLength={32}
              />
            ) : (
              <Text style={styles.value}>{user?.name ? user?.name : "NA"}</Text>
            )}
          </View>

          {loading ? (
            <ActivityIndicator size="small" color={colors.gray300} />
          ) : (
            <TouchableOpacity
              onPress={editing ? handleSave : () => setEditing(true)}
            >
              {editing ? (
                <Check size={22} color={colors.purple600} />
              ) : (
                <Pencil size={18} color={colors.purple600} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </Card>

      <Card>
        <View>
          <Text style={styles.label}>Mobile</Text>
          <Text style={styles.value}>+91 {user?.phoneNumber}</Text>
        </View>
      </Card>
      <Card>
        <View>
          <Text style={styles.label}>App Version</Text>
          <Text style={styles.value}>
            v{Application.nativeApplicationVersion}
          </Text>
        </View>
      </Card>
      <Card>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </Card>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    color: colors.gray400,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray900,
    width: 250,
    textTransform: "capitalize",
  },
  input: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray900,
    borderBottomWidth: 1,
    paddingBottom: 4,
    borderBottomColor: colors.gray300,
    width: 250,
  },
  logout: {
    color: colors.orange500,
    fontSize: 16,
    fontWeight: "600",
  },
});
