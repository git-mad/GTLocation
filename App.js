import { StatusBar } from "expo-status-bar";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import Dashboard from "./Dashboard";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import React, { useState, useEffect } from "react";
import { GlobalContext } from './GlobalContext';

import { isInEastArchitecture } from "./BuildingFunctions";

import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from './firebaseConfig';

// medium article
const LOCATION_TRACKING = "location-tracking";

/**
 * Taken from the following medium article:
 * https://arnav25.medium.com/background-location-tracking-in-react-native-d03bb7652602
 */

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let globalObj = {profile: [[user, setUser], [email, setEmail], [password, setPassword]]}

  TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
    if (error) {
      console.log("LOCATION_TRACKING task ERROR:", error);
      return;
    }
    if (data) {
      const { locations } = data;
      let lat = locations[0].coords.latitude;
      let long = locations[0].coords.longitude;

      console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
      if (user) {
        try {
          const docRef = await addDoc(collection(db, user.email), {
            latitude: lat,
            longitude: long,
            timeStamp: new Date(Date.now())
          });
          console.log("Document written with ID: ", docRef.id);

          if (isInEastArchitecture(lat, long)) {
            const userDocRef = doc(db, "BUILDINGS", user.email);

            const newDoc = {
              email: user.email,
              timeStamp: new Date(Date.now())
            }

            const docRef2 = await setDoc(userDocRef, newDoc);
            // TODO: THis is where the error is, it doesn't have any impact right now
            console.log("Updated location for ID: ", docRef2.id);
          }

        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  });
  /**
   * Taken from the following medium article:
   * https://arnav25.medium.com/background-location-tracking-in-react-native-d03bb7652602
   */
  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 5000,
      distanceInterval: 0,
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
    console.log("Has this started working:", hasStarted);
  };

  useEffect(() => {
    (async () => {
      var { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access foreground location was denied");
        return;
      }

      var { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access background location was denied");
        return;
      }

      await startLocationTracking();
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log(text);

  return (
    <GlobalContext.Provider value={globalObj}>
      <SafeAreaProvider>
        <PaperProvider>
            <Dashboard/>
          <StatusBar style="auto" />
        </PaperProvider>
      </SafeAreaProvider>
    </GlobalContext.Provider>

  );
}



AppRegistry.registerComponent(appName, () => Main);
