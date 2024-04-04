import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import InsightList from "./InsightList";
import { Card } from "react-native-paper";
export default Default = (props) => {
  return (
    <View style={styles.container}>
      <Card style={styles.cardMain}>
        <Card.Title title="Insights" titleStyle={styles.cardTitle}></Card.Title>
        <InsightList></InsightList>
      </Card>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(34,38,37)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardMain: {
    backgroundColor: "black",
    height: "80%",
    width: "90%",
  },
  cardTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
  },
});
