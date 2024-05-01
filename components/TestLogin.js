import React, { useState, useEffect, useContext } from "react";
import { View, Text, Alert, StyleSheet, SafeAreaView } from "react-native";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { TextInput, Card, Button } from "react-native-paper";
import { GlobalContext } from "../GlobalContext";
import { UseSwipe } from "./UseSwipe";

function TestLogin({ navigation }) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const context = useContext(GlobalContext);
  const [user, setUser] = context.profile[0];
  const [email, setEmail] = context.profile[1];
  const [password, setPassword] = context.profile[2];
  const { onTouchStart, onTouchEnd } = UseSwipe(onSwipeLeft, onSwipeRight, 6);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (i_user) => {
      if (initializing) setInitializing(false);
      if (i_user) {
        console.log(`Hi ${i_user.uid}`);
        user = i_user;
        setUser(i_user);
      } else {
        console.log("User is signed out");
        setUser(null); // Set user to null when signed out
      }
    });
    console.log("Test 2");
    //console.log(route.params);
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    } else {
      setInitializing(false);
    }

    // Cleanup function to unsubscribe from the listener
    return () => unsubscribe();
  }, []); // Empty dependency array ensures the effect runs only once

  const signUpButton = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        Alert.alert(`User Created with ${email} and ${password}`);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/invalid-email") {
          Alert.alert(
            "Your email is not formatted correctly (You need @gmail.com)"
          );
        }
        if (err.code === "auth/weak-password") {
          Alert.alert("Your password need to be at least 6 characters");
        }
        if (err.code === "auth/email-already-in-use") {
          Alert.alert("That email already exists");
        }
      });
  };

  const signInButton = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        Alert.alert(`Signed in!`);
        //console.log(user);
      })
      .catch((err) => {
        console.log(err);
        if (err.code == "auth/invalid-credential") {
          Alert.alert("Your username or password is incorrect");
        }
      });
  };

  const signOutButton = () => {
    signOut(auth)
      .then(() => {
        Alert.alert(`Signed out!`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (initializing) return null;

  function onSwipeLeft() {
    navigation.navigate("Home");
  }

  function onSwipeRight() {
    navigation.navigate("Map");
  }

  return (
    <>
      <SafeAreaView
        style={styles.content}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <View style={styles.view}>
          <Card style={styles.cardView}>
            <Card.Title
              title={`Welcome ${
                user != null ? user.email : "NULL"
              } to GTWrapped`}
              titleStyle={styles.cardTitle}
            ></Card.Title>
            {/* <Text>Email</Text> */}
            <TextInput
              label="GT Email"
              mode="outlined"
              keyboardType="email-address"
              editable
              disabled={user != null}
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email}
            ></TextInput>
            {/* <TextInput
              editable
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email}
            /> */}
            {/* <Text>Password</Text> */}
            <TextInput
              mode="outlined"
              label="Password"
              margin="10"
              secureTextEntry={true}
              editable
              disabled={user != null}
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
            ></TextInput>
            {/* <TextInput
              editable
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
            />
            <Text>Welcome {email}</Text> */}
            <Button
              mode="contained"
              textColor="black"
              style={styles.cardButton}
              title={"Sign Up"}
              onPress={() => {
                console.log("pressed sign up");
                signUpButton();
              }}
              disabled={email == "" || password == "" || user != null}
            >
              Sign Up
            </Button>
            {/* <Button
              title={"Sign Up"}
              onPress={() => {
                console.log("pressed sign up");
                signUpButton();
              }}
              disabled={email == "" || password == ""}
            ></Button> */}
            <Button
              mode="contained"
              textColor="black"
              style={styles.cardButton}
              title="Sign in"
              onPress={() => {
                console.log("Pressed sign in");
                console.log(`User: ${user}`);
                signInButton();
              }}
              disabled={email == "" || password == "" || user != null}
            >
              Login
            </Button>
            <Button
              mode="contained"
              textColor="black"
              style={styles.cardButton}
              title="Sign out"
              onPress={() => {
                console.log("Pressed sign out");
                signOutButton();
              }}
              disabled={user == null}
            >
              Sign Out
            </Button>
            <Text fontColor="white">Test</Text>
            {user ? <Text>{`Hi ${user.email}`}</Text> : <Text>Sad</Text>}
            <Button
              mode="contained"
              textColor="black"
              style={styles.cardButton}
              title={"Display stats"}
              onPress={() => {
                //console.log(user);
              }}
            >
              Display Stats
            </Button>
          </Card>
        </View>
      </SafeAreaView>
    </>
  );
}

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

export default TestLogin;
