import { useContext, useState, useRef, useEffect } from "react";
import { Card } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalContext } from "../GlobalContext";

export default InsightList = () => {
  const context = useContext(GlobalContext);
  const [insights, setInsights] = context.profile[3];
  const [augmentedInsights, setAugmentedInsights] = useState(
    insights.slice(0, insights.length > 9 ? 9 : insights.length)
  );

  //Renders Card elements
  return (
    <View styles={styles.containerStyle}>
      {augmentedInsights.map((element, index) => (
        <View
          style={styles.cardViewInsights}
          justifyContent={index % 2 == 0 ? "start" : "flex-end"}
          key={index}
        >
          <Card style={styles.cardInsights}>
            <Text style={styles.textInsights} key={element}>
              {element}
            </Text>
          </Card>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {},
  textInsights: {
    color: "black",
  },
  cardInsights: {
    backgroundColor: "rgb(193,255,213)",
    padding: 5,
  },
  cardViewInsights: {
    flexDirection: "row",
    padding: 15,
  },
});
