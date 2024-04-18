import { getAuth, signInAnonymously } from "firebase/auth";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const auth = getAuth();
  const image = require("../assets/metalBG.png");
  const [background, setBackground] = useState("");

  const ColorButton = ({ color }) => (
    <TouchableOpacity
      style={[styles.colorButton, { backgroundColor: color }]}
      onPress={() => setBackground(color)}
    />
  );

const signinUser = () => {
  signInAnonymously(auth)
    .then((result) => {
      navigation.navigate("Chat", {
        name: name,
        background: background,
        userId: result.user.uid, // Corrected here
      });
      Alert.alert("Logged in");
    })
    .catch((error) => {
      Alert.alert("Unable to sign in, try later again.");
    });
};

  return (
    <ImageBackground
      source={background ? null : image}
      resizeMode="cover"
      style={[styles.image, {backgroundColor: background}]}>
      <View style={styles.overlayContent}>
        <Text style={styles.text}>Prepare to chat</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor="rgba(117, 112, 131, 0.5)" // #757083 with 50% opacity
        />
        <View style={styles.transparentBox}>
          <Text style={styles.chooseColorText}>Choose background color</Text>

          <View style={styles.colorOptions}>
            <ColorButton color="#090C08" />
            <ColorButton color="#474056" />
            <ColorButton color="#8A95A5" />
            <ColorButton color="#B9C6AE" />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={signinUser}>
          <Text style={styles.buttonText}>Chat Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setBackground(null)}>
          <Text style={styles.resetButtonText}>Reset Background</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  transparentBox: {
    backgroundColor: "rgba(255, 255, 255, 0.3)", // semi-transparent white
    padding: 10,
    borderRadius: 5,
  },
  overlayContent: {
    flex: 1,
    justifyContent: "space-around", // distribute items evenly along the vertical axis
    alignItems: "center", // center items along the horizontal axis
  },
  chooseColorText: {
    fontSize: 16, // adjust the font size
    fontWeight: "300", // adjust the font weight
    color: "#000000", // adjust the font color
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 10,
    marginBottom: 10,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25, // make the button circular
  },
 text: {
  color: "#FFFFFF", // white color
  fontSize: 45, // larger font size
  fontWeight: "600", // semi-bold font weight
  shadowColor: "#000", // black shadow
  shadowOffset: { width: 0, height: 1 }, // shadow position
  shadowOpacity: 0.5, // shadow opacity
  shadowRadius: 3, // shadow blur radius
},
  textInput: {
    width: "88%",
    padding: 15,
    fontSize: 16, // adjust the font size
    fontWeight: "300", // adjust the font weight
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: "white",
  },
  button: {
    width: 80,
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  resetButton: {
    padding: 10,
    backgroundColor: '#757083', // adjust the background color
    borderRadius: 5, // adjust the border radius
    marginTop: 10, // adjust the margin
  },
  resetButtonText: {
    color: '#FFFFFF', // white color
    fontSize: 16, // adjust the font size
    textAlign: 'center', // center the text
  },
});

export default Start;