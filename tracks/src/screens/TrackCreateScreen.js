import '../_mockLocation'
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Text } from 'react-native-elements';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';

const TrackCreateScreen = () => {
  const { addLocation } = useContext(LocationContext)
  const [err, setErr] = useState(null);

  // requesting information from the user
  const startWatching = async () => {
    try {
      const { granted } = await requestPermissionsAsync();
      await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timerInterval: 1000,
        distanceInterval: 10
      }, (location) => {
        addLocation(location);
      })
      if (!granted) {
        throw new Error('Location permission not granted');
      }
    } catch (e) {
      setErr(e);
    }
  };

  useEffect(() => {
    startWatching();
  }, []);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable services</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;
