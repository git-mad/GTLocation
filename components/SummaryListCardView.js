import { useContext, useState, useRef, useEffect } from "react";
import { Card } from "react-native-paper";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { GlobalContext } from "../GlobalContext";

export default SummaryListCardView = () => {
  const context = useContext(GlobalContext);
  // sample locations
  const locations = [
    {
      name: "Dining Halls",
      info: [
        { name: "Brittan Dining Hall", time: 0 },
        { name: "West Village Dining Hall", time: 1 },
      ],
    },
    {
      name: "Classrooms",
      info: [
        { name: "Skiles Classroom Building", time: 2 },
        { name: "Clough Undergraduate Learning Commons", time: 3 },
      ],
    },
    {
      name: "Classrooms",
      info: [
        { name: "Skiles Classroom Building", time: 2 },
        { name: "Clough Undergraduate Learning Commons", time: 3 },
      ],
    },
    {
      name: "Classrooms",
      info: [
        { name: "Skiles Classroom Building", time: 2 },
        { name: "Clough Undergraduate Learning Commons", time: 3 },
      ],
    },
    {
      name: "Classrooms",
      info: [
        { name: "Skiles Classroom Building", time: 2 },
        { name: "Clough Undergraduate Learning Commons", time: 3 },
      ],
    },
    {
      name: "Classrooms",
      info: [
        { name: "Skiles Classroom Building", time: 2 },
        { name: "Clough Undergraduate Learning Commons", time: 3 },
      ],
    },
  ];

  const log = (element) => {
    console.log(element);
  };

  //Renders Card elements
  return (
    <>
      <Card style={styles.cardMain}>
        <Card.Title title="Summary" titleStyle={styles.cardTitle}></Card.Title>
        <ScrollView styles>
          {locations.map((element) => (
            <>
              <Card.Title
                title={element.name}
                titleStyle={styles.cardHeading}
                key={element.name}
              ></Card.Title>
              {element.info.map((element2, index) => (
                <>
                  {console.log(element2)}
                  <View style={styles.cardViewInsights} key={index}>
                    <Card style={styles.cardInsights}>
                      <Text style={styles.textInsights} key={element2.name}>
                        You spent {element2.time} hours at {element2.name}
                      </Text>
                    </Card>
                  </View>
                </>
              ))}
            </>
          ))}
        </ScrollView>
      </Card>
    </>
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
  cardHeading: {
    color: "white",
    textAlign: "left",
    fontSize: 20,
    marginTop: 10,
  },
  textInsights: {
    color: "black",
  },
  cardInsights: {
    backgroundColor: "rgb(193,255,213)",
    padding: 5,
  },
  cardViewInsights: {
    flexDirection: "row",
    padding: 10,
  },
});
