import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from 'react-native';
export default Default = (props) => {
    return (
        <View style={styles.container}>
        <Text>Empty Dash</Text>
        <StatusBar style="auto" />
      </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });