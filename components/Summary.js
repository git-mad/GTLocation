import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SummaryListCardView from "./SummaryListCardView";
import { Card } from "react-native-paper";
import { GestureHandler } from "expo";
import * as React from "react";
import { UseSwipe } from "./UseSwipe";
import InsightListCardView from "./InsightListCardView";

export default Summary = ({ navigation }) => {
  const { onTouchStart, onTouchEnd } = UseSwipe(onSwipeLeft, onSwipeRight, 6);

  function onSwipeLeft() {
    navigation.navigate("Default");
  }

  function onSwipeRight() {
    navigation.navigate("Default");
  }

  return (
    <>
      <View
        style={styles.container}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <SummaryListCardView></SummaryListCardView>
        <StatusBar style="auto" />
      </View>
      <Text>SummaryCardView</Text>
    </>
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
