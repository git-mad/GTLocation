import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Default from "../components/Default";
import Test2 from "./Test2";
export default function InsightNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Default" component={Default} />
        <Stack.Screen name="Test2" component={Test2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
