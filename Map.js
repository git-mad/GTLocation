import React, { useState, useEffect  } from 'react';
import MapView, { Polygon } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Map() {
  // Georgia Tech Coordinates
  const init_reg = {
    latitude: 33.7756,
    longitude: -84.3963,
    latitudeDelta: 0.029,
    longitudeDelta: 0.015,
  }
  
  return (
    
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} 
      showsUserLocation = {true}
      followsUserLocation = {true}
      initialRegion={init_reg}>
        <Polygon fillColor={"rgba(173,216,230,0.5)"} coordinates={[ //Top left, bottom left, bottom right, top right
          {latitude: 33.77630556911948, longitude: -84.39575491672663},
          {latitude: 33.77565645321612, longitude: -84.39568608972736},
          {latitude: 33.77568505842732, longitude: -84.39492369835084},
          {latitude: 33.776261561417044, longitude: -84.39491575677398},

]}>

        </Polygon>
      </MapView>
    </SafeAreaView>
  );




  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

