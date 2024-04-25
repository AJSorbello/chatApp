import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Start from './components/Start';
import Chat from './components/Chat';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';
import { LogBox, Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const [db, setDb] = useState(null);
    const [storage, setStorage] = useState(null); // Add this line
  const connectionStatus = useNetInfo();

  useEffect(() => {
     if (db) {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }
  }, [connectionStatus.isConnected, db]);

 useEffect(() => {
    if (!getApps().length) {
      const app = initializeApp(firebaseConfig);
      const firestoreDb = getFirestore(app);
      const firebaseStorage = getStorage(app);
      setDb(firestoreDb);
      setStorage(firebaseStorage); // Add this line

    // Initialize Firebase Auth with AsyncStorage
    const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
  }, []);

  if (!db) {
    return null; // or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Home" component={Start} />
  <Stack.Screen
          name="Chat"
        >
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db}
            storage={storage}
            {...props}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;