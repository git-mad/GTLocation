import { useContext, useState, useRef, useEffect } from "react";
import { Card } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalContext } from "../GlobalContext";

// Seperates insights into left and right lists
const SeperateInsights = () => {
  const context = useContext(GlobalContext);
  const [insights, setInsights] = context.profile[3];

  const [leftInsights, setLeftInsights] = useState([]);
  const [rightInsights, setRightInsights] = useState([]);

  useEffect(() => {
    // Checks and restricts iteration to not overflow on screen
    let maxIndex = insights.leftCardViewInsights > 6 ? insights.length : 6;
    console.log(maxIndex);

    // Resets left and right insight lists for expo re-rendering
    setLeftInsights([]);
    setRightInsights([]);

    for (let i = 0; i < maxIndex; i++) {
      if (i % 2 == 0) {
        if (insights[i] != null)
          setLeftInsights((prevState) => [...prevState, insights[i]]);
      } else {
        if (insights[i] != null)
          setRightInsights((prevState) => [...prevState, insights[i]]);
      }
    }
  }, [insights]);

  return { leftInsights, rightInsights };
};

// Creates Card elements for insights
export default InsightList = () => {
  const { leftInsights, rightInsights } = SeperateInsights();

  //Renders Card elements for both left and right sides
  return (
    <View styles={styles.containerStyle}>
      {leftInsights.map((element, key) => (
        <View style={styles.leftCardViewInsights} key={key}>
          <Card style={styles.cardInsights}>
            <Text style={styles.textInsights} key={element}>
              {element}
            </Text>
          </Card>
        </View>
      ))}
      {rightInsights.map((element, key) => (
        <View style={styles.rightCardViewInsights} key={key}>
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
  leftCardViewInsights: {
    flexDirection: "row",
    justifyContent: "start",
    padding: 15,
  },
  rightCardViewInsights: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 15,
  },
});
