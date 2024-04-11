import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  const image = require('../assets/metalBG.png');

  const ColorButton = ({ color }) => (
    <TouchableOpacity
      style={[styles.colorButton, { backgroundColor: color }]}
      onPress={() => console.log(`Color ${color} selected`)} // replace with your own function
    />
  );

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.overlayContent}>
        <Text style={styles.text}>Prepare to chat</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder='Your name'
          placeholderTextColor='rgba(117, 112, 131, 0.5)' // #757083 with 50% opacity
        />
        <Text style={styles.chooseColorText}>Choose background color</Text>
        <View style={styles.colorOptions}>
          <ColorButton color="#090C08" />
          <ColorButton color="#474056" />
          <ColorButton color="#8A95A5" />
          <ColorButton color="#B9C6AE" />
        </View>
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
    justifyContent: 'space-around', // distribute items evenly along the vertical axis
    alignItems: 'center', // center items along the horizontal axis
  },
   chooseColorText: {
    fontSize: 16, // adjust the font size
    fontWeight: '300', // adjust the font weight
    color: '#757083', // adjust the font color
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 10,
    marginBottom: 10,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25, // make the button circular
  },
  text: {
    color: '#FFFFFF', // white color
    fontSize: 45, // larger font size
    fontWeight: '600', // semi-bold font weight
  },
  textInput: {
    width: "88%",
    padding: 15,
    fontSize: 16, // adjust the font size
    fontWeight: '300', // adjust the font weight
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