
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Default from './components/Default';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createMaterialBottomTabNavigator();

export default Dashboard = () => {
    return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" children={() => <Default name = "Home" /> }  
      options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Map" children={() => <Default name = "Map"/>} options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={26} />
          ),
        }}/>
    </Tab.Navigator>
    
    )
}

