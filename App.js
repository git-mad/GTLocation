import { StatusBar } from 'expo-status-bar';
import { AppRegistry} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import Dashboard from './Dashboard';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Dashboard/>
        
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
