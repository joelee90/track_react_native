import { useState, useEffect } from 'react';
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from 'expo-location';

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);
  const [subscriber, setSubscriber] = useState(null);
  // requesting information from the user
  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      const subs = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timerInterval: 1000,
          distanceInterval: 10,
        },
        callback
      );
      setSubscriber(subs);
    } catch (e) {
      setErr(e);
    }
  };
  useEffect(() => {
    if (shouldTrack) {
      startWatching();
    } else {
      subscriber.remove();
      setSubscriber(null);
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);
  return [err];
};
