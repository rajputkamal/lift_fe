import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Application from "expo-application";

import { colors } from "../constants/colors";
import Card from "../components/Card";
import Title from "../components/Title";
import { deleteToken } from "../utils/identity";
import { updateProfile } from "../utils/api";
import UserContext from "../context/UserContext";
import CopyRight from "../components/CopyRight";

export default function ProfileSettingsScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  const [name, setName] = useState(user?.name || "");
  const [editing, setEditing] = useState(false);

  const handleSave = async () => {
    if (name.trim().length === 0) {
      Alert.alert("Invalid Name", "Name cannot be empty.");
      return;
    }

    const result = await updateProfile({ name });
    if (!result?.message) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
      return;
    } else {
      setUser({ ...user, name: result.user.name });
      Alert.alert(
        "Profile Updated!",
        "Your name has been updated successfully."
      );
    }
    setEditing(false);
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
                onChangeText={(text) => setName(text)}
                autoFocus
                placeholder="Enter your name"
                placeholderTextColor={colors.gray400}
                autoCorrect={false}
              />
            ) : (
              <Text style={styles.value}>{user?.name ? user?.name : "NA"}</Text>
            )}
          </View>

          <TouchableOpacity onPress={() => setEditing(!editing)}>
            <Ionicons
              name={editing ? "checkmark-outline" : "pencil-outline"}
              size={22}
              color={colors.purple600}
              style={{ padding: 4 }}
              onPress={editing ? handleSave : () => setEditing(true)}
            />
          </TouchableOpacity>
        </View>
      </Card>

      <Card>
        <View>
          <Text style={styles.label}>Mobile</Text>
          <Text style={styles.value}>{user?.phoneNumber}</Text>
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
      <CopyRight />
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
  },
  input: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray900,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
    paddingVertical: 2,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  logout: {
    color: colors.orange500,
    fontSize: 16,
    fontWeight: "600",
  },
});
