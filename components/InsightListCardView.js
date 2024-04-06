import { useContext, useState, useRef, useEffect } from "react";
import { Card } from "react-native-paper";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { GlobalContext } from "../GlobalContext";

export default InsightListCardView = () => {
  const context = useContext(GlobalContext);
  const [insights, setInsights] = context.profile[3];

  //Renders Card elements
  return (
    <Card style={styles.cardMain}>
      <Card.Title title="Insights" titleStyle={styles.cardTitle}></Card.Title>
      <ScrollView styles={styles.scrollViewStyle}>
        {insights.map((element, index) => (
          <View styles={styles.insightsContainer}>
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
          </View>
        ))}
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardMain: {
    backgroundColor: "black",
    height: "85%",
    width: "90%",
  },
  cardTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
  },
  insightsContainer: {},
  textInsights: {
    color: "black",
  },
  scrollViewStyle: {},
  cardInsights: {
    backgroundColor: "rgb(193,255,213)",
    padding: 5,
  },
  cardViewInsights: {
    flexDirection: "row",
    padding: 15,
  },
});
