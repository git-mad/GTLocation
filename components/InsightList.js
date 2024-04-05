import { useContext, useState, useRef, useEffect } from "react";
import { Card } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalContext } from "../GlobalContext";

// Seperates insights into first, second, and third lists
const SeperateInsights = () => {
  const context = useContext(GlobalContext);
  const [insights, setInsights] = context.profile[3];

  const [firstInsights, setFirstInsights] = useState([]);
  const [secondInsights, setSecondInsights] = useState([]);
  const [thirdInsights, setThirdInsights] = useState([]);

  useEffect(() => {
    // Checks and restricts iteration to not overflow on screen
    let maxIndex = insights.leftCardViewInsights > 6 ? insights.length : 6;
    console.log(maxIndex);

    // Resets first, second, and third insight lists for expo re-rendering
    setFirstInsights([]);
    setSecondInsights([]);
    setThirdInsights([]);

    for (let i = 0; i < maxIndex; i++) {
      switch (i) {
        case 0:
          setFirstInsights((prevState) => [...prevState, insights[i]]);
          break;
        case 1:
          setFirstInsights((prevState) => [...prevState, insights[i]]);
          break;
        case 2:
          setSecondInsights((prevState) => [...prevState, insights[i]]);
          break;
        case 3:
          setSecondInsights((prevState) => [...prevState, insights[i]]);
          break;
        case 4:
          setThirdInsights((prevState) => [...prevState, insights[i]]);
          break;
        case 5:
          setThirdInsights((prevState) => [...prevState, insights[i]]);
          break;
      }
    }
  }, [insights]);

  return { firstInsights, secondInsights, thirdInsights };
};

// Creates Card elements for insights
export default InsightList = () => {
  const { firstInsights, secondInsights, thirdInsights } = SeperateInsights();

  //Renders Card elements for both left and right sides
  return (
    <View styles={styles.containerStyle}>
      {firstInsights.map((element, key) => (
        <View style={styles.leftCardViewInsights} key={key}>
          <Card style={styles.cardInsights}>
            <Text style={styles.textInsights} key={element}>
              {element}
            </Text>
          </Card>
        </View>
      ))}
      {secondInsights.map((element, key) => (
        <View style={styles.rightCardViewInsights} key={key}>
          <Card style={styles.cardInsights}>
            <Text style={styles.textInsights} key={element}>
              {element}
            </Text>
          </Card>
        </View>
      ))}
      {thirdInsights.map((element, key) => (
        <View style={styles.leftCardViewInsights} key={key}>
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
