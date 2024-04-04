import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { TextInput, Card, Button } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Login = () => {
  const [text, setText] = React.useState("");

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.view}>
        <Card style={styles.cardView}>
          <Card.Title
            title="Welcome to GTWrapped"
            titleStyle={styles.cardTitle}
          ></Card.Title>

          <Card.Content>
            <TextInput
              label="GT Email"
              mode="outlined"
              keyboardType="email-address"
            ></TextInput>

            <TextInput
              mode="outlined"
              label="Password"
              margin="10"
              secureTextEntry={true}
            ></TextInput>

            <Button
              mode="contained"
              textColor="black"
              style={styles.cardButton}
            >
              Login
            </Button>
            <Button
              mode="contained"
              textColor="black"
              style={styles.cardButton}
            >
              Sign Up
            </Button>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgb(34,38,37)",
  },
  view: {
    width: "80%",
  },
  cardTitle: {
    color: "white",
  },
  cardButton: {
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "rgb(193,255,213)",
  },
  cardView: {
    backgroundColor: "black",
  },
});

export default Login;
