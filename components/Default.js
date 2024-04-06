import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import InsightListCardView from "./InsightListCardView";
import { Card } from "react-native-paper";
import { GestureHandler } from "expo";

export default Default = (props) => {
  return (
    <View style={styles.container}>
      <InsightListCardView></InsightListCardView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(34,38,37)",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
