import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "./navigation/stackParamList";
import { navigationRef } from "./RootNavigation";
import Home from "./screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Compare from "./screens/Compare";
import TabBar from "./components/TabBar";
import { SafeAreaView } from "react-native";

export default function App() {
  const Stack = createNativeStackNavigator<AppStackParamList>();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name="bottom" component={HomeNavigation} />
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();
function HomeNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => {
        return (
          <SafeAreaView>
            <TabBar {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Compare" component={Compare} />
    </Tab.Navigator>
  );
}
