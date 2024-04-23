import { getAuth, signInAnonymously } from "firebase/auth";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import metalBG from '../assets/metalBG.png'; // adjust the path according to your project structure

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [background, setBackground] = useState(null);

  const ColorButton = ({ colors }) => (
    <TouchableOpacity onPress={() => setBackground(colors)}>
      <View style={{backgroundColor: colors[0], width: 50, height: 50, borderRadius: 25}} />
    </TouchableOpacity>
  );
const signinUser = () => {
  const auth = getAuth();
  signInAnonymously(auth)
    .then((userCredential) => {
      // Signed in..
      const user = userCredential.user;
      const color = background ? background[0] : '#757083'; // extract the color from the background array
      navigation.navigate('Chat', { color: color, background: metalBG });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      console.log("Error code: ", errorCode);
      console.log("Error message: ", errorMessage);
    });
};

  return (
    <ImageBackground source={metalBG} style={styles.container}>
      <LinearGradient colors={background || ['transparent', 'transparent']} style={styles.overlayContent}>
        <Text style={styles.text}>Prepare to chat</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor="rgba(117, 112, 131, 0.5)" // #757083 with 50% opacity
        />
        <TouchableOpacity style={styles.button} onPress={signinUser}>
          <Text style={styles.buttonText}>Chat Now</Text>
        </TouchableOpacity>
        <View style={styles.transparentBox}>
          <Text style={styles.chooseColorText}>Choose background color</Text>
          <View style={styles.colorOptions}>
            <ColorButton colors={['#090C08', '#474056']} />
            <ColorButton colors={['#474056', '#8A95A5']} />
            <ColorButton colors={['#8A95A5', '#B9C6AE']} />
            <ColorButton colors={['#B9C6AE', '#090C08']} />
          </View>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => setBackground(null)}>
            <Text style={styles.resetButtonText}>Reset Background</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  overlayContent: {
    flex: 1,
    justifyContent: "space-around",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 45,
    fontWeight: "600",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    textAlign: 'center',
  },
  textInput: {
    width: "88%",
    padding: 15,
    fontSize: 16,
    fontWeight: "300",
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: "white",
    alignSelf: 'center',
  },
  transparentBox: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 10,
    borderRadius: 5,
    width:'100%',
    alignSelf: 'center',
  },
  chooseColorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#000000",
    textAlign: 'center',
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  button: {
    width: 80,
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  resetButton: {
    padding: 10,
    backgroundColor: '#757083',
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Start;