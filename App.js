import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { UserContextProvider } from "./context/UserContext";
// Screens
import Login from "./screens/Login";
import Otp from "./screens/Otp";
import Home from "./screens/Home";
import ProfileSettings from "./screens/ProfileSettings";
import AvailableRides from "./screens/AvailableRides";
// Components
import Logo from "./components/Logo";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function MainTabs() {
  return (
    <UserContextProvider>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Map") iconName = "home-outline";
            else if (route.name === "Rides") iconName = "car-outline";
            else if (route.name === "Profile") iconName = "person-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <BottomTab.Screen
          name="Map"
          component={Home}
          options={{ title: "Home" }}
        />
        <BottomTab.Screen
          name="Rides"
          component={AvailableRides}
          options={{ title: "Available Rides" }}
        />
        <BottomTab.Screen name="Profile" component={ProfileSettings} />
      </BottomTab.Navigator>
    </UserContextProvider>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="login"
          screenOptions={{
            headerTitle: () => <Logo />,
          }}
        >
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen
            name="otp"
            component={Otp}
            options={{
              title: "Change Number",
            }}
          />
          <Stack.Screen
            name="map"
            component={MainTabs}
            options={{
              headerTitle: () => <Logo />,
              headerLeft: () => null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
