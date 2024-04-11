// import necessary components and libraries
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ImageBackground source={require('./path-to-your-image.png')} style={styles.image}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default App;