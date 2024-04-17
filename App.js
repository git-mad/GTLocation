import { StatusBar } from "expo-status-bar";
import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import Dashboard from "./Dashboard";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import React, { useState, useEffect } from "react";
import { GlobalContext, InsightContext } from "./GlobalContext";
import Default from "./components/Default";
import Map from "./Map";
import TestLogin from "./components/TestLogin";
import {
  isInEastArchitecture,
  isInInstructionalCenter,
  buildingList
} from "./BuildingFunctions";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// medium article
const LOCATION_TRACKING = "location-tracking";

/**
 * Taken from the following medium article:
 * https://arnav25.medium.com/background-location-tracking-in-react-native-d03bb7652602
 */

export default function App() {
  // test data to test insights page
  const insights = useState([
    "You spent 3 hours at Brittan Dining Hall",
    "You spent 3 hours at Brittan Dining Hall",
    "You spent 3 hours at Brittan Dining Hall",
    "You spent 4 hours at the Georgia Tech Library",
    "You spent 2 hours at Clough",
    "You spent 5 hours at Klaus",
  ]);
  const time = useState(0)
  const currLocation = useState("")
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let globalObj = {
    profile: [
      [user, setUser],
      [email, setEmail],
      [password, setPassword],
    ],
  };
  let insightObj = {insights: insights, time:time, currLocation:currLocation}

  TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
    if (error) {
      console.log("LOCATION_TRACKING task ERROR:", error);
      return;
    }
    if (data) {
      const { locations } = data;
      let lat = locations[0].coords.latitude;
      let long = locations[0].coords.longitude;

      //console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
      if (user) {
        try {
          const docRef = await addDoc(collection(db, user.email), {
            latitude: lat,
            longitude: long,
            timeStamp: new Date(Date.now()),
          });
          console.log("Document written with ID: ", docRef.id);

          const userDocRef = doc(db, "BUILDINGS", user.email);
          const userDocSnapshot = await getDoc(userDocRef);
          const userBuildingData = userDocSnapshot.data();

          let inAnyBuilding = false;
          console.log(buildingList + "Test")
          for (const building of buildingList) {
            console.log("Test" + building)
            if (building.isInBuilding(lat, long)) {
              if (currLocation[0] == building.name) {
                time[1]((prevTime) => {return prevTime + 5})
                insights[1]((prevInsights)=> {
                  return [...prevInsights, "You have been in " + building.name + ` for ${time[0] + 5} seconds`]
                })
              } else {
                
                insights[1]((prevInsights)=> {
                  return [...prevInsights, "You entered " + building.name]
                })
                currLocation[1](building.name)
                time[1](0)
                
              }
              const previousTime = userBuildingData[building.firestoreAttribute] || 0;
              const newDoc = {
                ...userBuildingData,
                email: user.email,
                [building.firestoreAttribute]: previousTime + 5,
              };
              const docRef2 = await setDoc(userDocRef, newDoc);
              console.log(`Updated location for ${building.name}: `, previousTime + 5);
              inAnyBuilding = true;
              break; // Exit the loop after finding the building
            }
          }

          if (!inAnyBuilding) {
            const previousTime = userBuildingData.timeOutside || 0;
            if (currLocation[0] != "") {
              insights[1]((prevInsights)=> {
                return [...prevInsights, "You left " + currLocation[0] + ". You spent " + time[0]]
              })
              currLocation[1]("")
              time[1](0)

            }

            const newDoc = {
              ...userBuildingData,
              email: user.email,
              timeOutside: previousTime + 5
            }

            const docRef2 = await setDoc(userDocRef, newDoc);
            console.log("Updated location for Outside: ", previousTime);
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } else {
        console.log("User not connected...");
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
      <InsightContext.Provider value={insights}>
        <SafeAreaProvider>
          <PaperProvider>
            <Dashboard/>
          </PaperProvider>
        </SafeAreaProvider>
      </InsightContext.Provider>
    </GlobalContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
