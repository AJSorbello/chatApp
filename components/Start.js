import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  const image = require('../assets/metalBG.png');

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.overlayContent}>
        <Text style={styles.text}>Prepare to chat</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder='Type your username here'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Chat', { name: name })}>
          <Text style={styles.buttonText}>Chat Now</Text>
        </TouchableOpacity>
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
  overlayContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: 'white',
  },
 button: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50 / 2,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Start;