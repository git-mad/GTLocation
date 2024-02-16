import React, { useState, useEffect  } from 'react';
import MapView from 'react-native-maps';
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
      initialRegion={init_reg}
      />
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

