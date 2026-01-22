import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LayoutGrid, User, CarFront, ClipboardList } from "lucide-react-native";

import { UserContextProvider } from "./context/UserContext";
// Screens
import Login from "./screens/Login";
import Otp from "./screens/Otp";
import Home from "./screens/Home";
import ProfileSettings from "./screens/ProfileSettings";
import AvailableRides from "./screens/AvailableRides";
import Splash from "./screens/Splash";
import MyRides from "./screens/MyRides";
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
            if (route.name === "Map") {
              return <LayoutGrid color={color} size={size} />;
            } else if (route.name === "Rides") {
              return <CarFront color={color} size={size} />;
            } else if (route.name === "myRides") {
              return <ClipboardList color={color} size={size} />;
            } else if (route.name === "Profile") {
              return <User color={color} size={size} />;
            }
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
        <BottomTab.Screen
          name="myRides"
          component={MyRides}
          options={{ title: "My Rides" }}
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
          initialRouteName="splash"
          screenOptions={{
            headerTitle: () => <Logo />,
          }}
        >
          <Stack.Screen name="splash" component={Splash} />
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
