import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../constants/colors";
import Card from "../components/Card";
import Title from "../components/Title";

export default function ProfileSettingsScreen() {
  const [name, setName] = useState("Rahul Sharma");
  const [mobile] = useState("+91 98765 43210");
  const [editing, setEditing] = useState(false);
  const [appVersion] = useState("v1.0.0");

  const handleSave = () => {
    setEditing(false);
    Alert.alert("Profile Updated", "Your name has been updated successfully.");
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
                onChangeText={setName}
                autoFocus
                placeholder="Enter your name"
                placeholderTextColor={colors.gray400}
              />
            ) : (
              <Text style={styles.value}>{name}</Text>
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
          <Text style={styles.value}>{mobile}</Text>
        </View>
      </Card>

      <Card>
        <View>
          <Text style={styles.label}>App Version</Text>
          <Text style={styles.value}>{appVersion}</Text>
        </View>
      </Card>
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
});
