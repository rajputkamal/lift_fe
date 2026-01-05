import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Pencil, Check } from "lucide-react-native";
import * as Application from "expo-application";

import { theme } from "../styles/theme";
import Card from "../components/Card";
import { deleteToken } from "../utils/identity";
import { updateUserProfile } from "../apis/profile.js";
import UserContext from "../context/UserContext";
import Footer from "../components/Footer";
import LiftSnackBar from "../components/LiftSnackbar";
import Avatar from "../components/Avatar";
import { capitalizeWords } from "../utils/helper";

export default function ProfileSettingsScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [name, setName] = useState(user?.name || "NA");
  const [vehicle, setVehicle] = useState(user?.vehicleNumber || "NA");
  const [editingName, setEditingName] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(false);

  const nameChangeHandler = (text) => setName(text);

  const handleSave = async (key) => {
    const value = key === "name" ? name : vehicle;
    const trimmed = value.trim();

    if (!trimmed) {
      setError(
        `${key === "name" ? "Name" : "Vehicle number"} cannot be empty.`
      );
      return;
    }

    if (key === "name") {
      const hasInvalidChars = /[^a-zA-Z\s]/.test(trimmed);
      if (hasInvalidChars) {
        setError("Name cannot contain special characters.");
        return;
      }
    }

    if (key === "vehicleNumber") {
      const hasInvalidChars = /[^A-Z0-9\s-]/i.test(trimmed);
      if (hasInvalidChars) {
        setError("Vehicle number format is invalid.");
        return;
      }
    }

    try {
      setLoading(true);

      const payload = { [key]: trimmed };
      const result = await updateUserProfile(payload);

      if (!result?.user) {
        setError("Failed to update profile. Please try again.");
        return;
      }

      setUser((prev) => ({
        ...prev,
        [key]: result.user[key],
      }));

      if (key === "name") setEditingName(false);
      if (key === "vehicleNumber") setEditingVehicle(false);

      setSuccess(
        `${key === "name" ? "Name" : "Vehicle number"} updated successfully.`
      );
    } catch (err) {
      setError("Failed to update profile. Please try again.");
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
      <Card>
        <View style={styles.nameContainer}>
          <Avatar name={user?.name ? user?.name : "NA"} />
          <View>
            <Text style={styles.label}>Name</Text>
            {editingName ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={nameChangeHandler}
                autoFocus
                placeholder="Enter your name"
                placeholderTextColor={theme.color.gray400}
                autoCorrect={false}
                maxLength={32}
              />
            ) : (
              <Text style={styles.value}>{capitalizeWords(name)}</Text>
            )}
          </View>

          {loading && editingName ? (
            <ActivityIndicator size="small" color={theme.color.gray300} />
          ) : (
            <TouchableOpacity
              onPress={
                editingName
                  ? () => handleSave("name")
                  : () => setEditingName(true)
              }
            >
              {editingName ? (
                <Check size={22} color={theme.color.purple600} />
              ) : (
                <Pencil size={18} color={theme.color.purple600} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </Card>

      <Card>
        <View style={styles.nameContainer}>
          <View>
            <Text style={styles.label}>Vehicle Number</Text>
            {editingVehicle ? (
              <TextInput
                style={styles.input}
                value={vehicle}
                onChangeText={(text) => setVehicle(text)}
                autoFocus
                placeholder="Vehcile type | Vehicle number"
                placeholderTextColor={theme.color.gray400}
                autoCorrect={false}
                maxLength={32}
              />
            ) : (
              <Text style={styles.value}>{(vehicle || "").toUpperCase()}</Text>
            )}
          </View>

          {loading && editingVehicle ? (
            <ActivityIndicator size="small" color={theme.color.gray300} />
          ) : (
            <TouchableOpacity
              onPress={
                editingVehicle
                  ? () => handleSave("vehicleNumber")
                  : () => setEditingVehicle(true)
              }
            >
              {editingVehicle ? (
                <Check size={22} color={theme.color.purple600} />
              ) : (
                <Pencil size={18} color={theme.color.purple600} />
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
      <LiftSnackBar
        visible={!!error}
        type="error"
        text={error}
        onDismiss={() => setError(null)}
        duration={1000}
      />
      <LiftSnackBar
        visible={(!editingName || !editingVehicle) && !!success}
        type="success"
        text={success}
        onDismiss={() => setSuccess(null)}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: theme.fontSize._14,
    color: theme.color.gray400,
    marginBottom: theme.spacing.xs,
  },
  value: {
    fontSize: theme.fontSize._16,
    fontWeight: theme.weight.semi,
    color: theme.color.gray900,
    width: 250,
    // textTransform: "capitalize",
  },
  input: {
    fontSize: theme.fontSize._16,
    fontWeight: theme.weight.semi,
    color: theme.color.gray900,
    borderBottomWidth: 1,
    paddingBottom: theme.spacing.xs,
    borderBottomColor: theme.color.gray300,
    width: 250,
  },
  logout: {
    color: theme.color.orange500,
    fontSize: theme.fontSize._16,
    fontWeight: theme.weight.semi,
  },
});
