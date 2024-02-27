
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Default from './components/Default';
import Map from './Map'
import TestLogin from './components/TestLogin';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native';
const Tab = createMaterialBottomTabNavigator();

export default Dashboard = ({setUser, user}) => {
    return (
      <NavigationContainer>
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Login" component={TestLogin}
      initialParams={{setUser, user}}
        options={{
            tabBarLabel: 'Login',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
      />
      <Tab.Screen name="Home" component={Default}
      options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Map" component={Map} options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          ),
        }}/>
    </Tab.Navigator>
    </NavigationContainer>

    )
}