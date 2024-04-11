import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name } = route.params;
  const image = require('../assets/metalBG.png'); // replace with the path to your image

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text>waiting 4 someone?</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255)', // semi-transparent black
    padding: 10,
    borderRadius: 5,
  }
});

export default Chat;