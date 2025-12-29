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

import { colors } from "../constants/colors";
import Card from "../components/Card";
import { deleteToken } from "../utils/identity";
import { updateProfile } from "../utils/api";
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
      const result = await updateProfile(payload);

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
                placeholderTextColor={colors.gray400}
                autoCorrect={false}
                maxLength={32}
              />
            ) : (
              <Text style={styles.value}>{capitalizeWords(name)}</Text>
            )}
          </View>

          {loading && editingName ? (
            <ActivityIndicator size="small" color={colors.gray300} />
          ) : (
            <TouchableOpacity
              onPress={
                editingName
                  ? () => handleSave("name")
                  : () => setEditingName(true)
              }
            >
              {editingName ? (
                <Check size={22} color={colors.purple600} />
              ) : (
                <Pencil size={18} color={colors.purple600} />
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
                placeholderTextColor={colors.gray400}
                autoCorrect={false}
                maxLength={32}
              />
            ) : (
              <Text style={styles.value}>{(vehicle || "").toUpperCase()}</Text>
            )}
          </View>

          {loading && editingVehicle ? (
            <ActivityIndicator size="small" color={colors.gray300} />
          ) : (
            <TouchableOpacity
              onPress={
                editingVehicle
                  ? () => handleSave("vehicleNumber")
                  : () => setEditingVehicle(true)
              }
            >
              {editingVehicle ? (
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
    paddingHorizontal: 16,
    paddingBottom: 8,
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
    // textTransform: "capitalize",
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
