import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import {
  GiftedChat,
  Bubble,
  Day,
  Accessibility,
  SystemMessage,
  InputToolbar,
} from "react-native-gifted-chat";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';


const image = require("../assets/metalBG.png"); // make sure this path is correct

const Chat = ({ route, db, navigation, isConnected, storage }) => {
  const [messages, setMessages] = useState([]);
  const { background, userId, name, color = "#757083" } = route.params;

  const styles = StyleSheet.create({
    image: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    container: {
      flex: 1,
      justifyContent: "flex-end",
      paddingBottom: 10,
    },
    textContainer: {
       backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: 5,
      padding: 5, 
      flex: 1,
      marginBottom: 20,
    },
     inputToolbar: {
      borderRadius: 20,
      marginHorizontal: 10,

    },
  });

  const [messageCount, setMessageCount] = useState(0);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    setMessageCount((prevCount) => {
      const newCount = prevCount + 1; // increment the message count

      // if the user has sent 3 messages, send an automatic response
      if (newCount % 3 === 0) {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, {
            _id: Math.round(Math.random() * 1000000),
            text: "Hang on one sec",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "Auto Responder",
            },
          })
        );
      }

      return newCount;
    });
  }, []);

  const uploadAndSendImage = async (imageURI) => {
  const uniqueRefString = generateReference(imageURI);
  const newUploadRef = ref(storage, uniqueRefString);
  const response = await fetch(imageURI);
  const blob = await response.blob();
  uploadBytes(newUploadRef, blob).then(async (snapshot) => {
    const imageURL = await getDownloadURL(snapshot.ref)
    onSend({ image: imageURL })
  });
}

const pickImage = async () => {
  let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissions?.granted) {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
    else Alert.alert("Permissions haven't been granted.");
  }
}

const takePhoto = async () => {
  let permissions = await ImagePicker.requestCameraPermissionsAsync();
  if (permissions?.granted) {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
    else Alert.alert("Permissions haven't been granted.");
  }
}

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected) {
      const messagesCollection = collection(db, "messages");
      const q = query(messagesCollection, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: firebaseData.text,
            createdAt: new Date(firebaseData.createdAt.seconds * 1000),
            user: firebaseData.user,
            color: firebaseData.color,
          };

          return data;
        });

        setMessages(messages);
        AsyncStorage.setItem("messages", JSON.stringify(messages)); // cache messages
      });

      return unsubscribe;
    } else {
      // load cached messages from local storage
      AsyncStorage.getItem("messages").then((data) => {
        if (data !== null) {
          setMessages(JSON.parse(data));
        }
      });
    }
  }, [isConnected]);
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "#000", // make the text color of the right bubble black
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: "#FFF", // make the background color of the right bubble white
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  const renderDay = (props) => {
    return <Day {...props} textStyle={{ color: "white" }} />;
  };
  const renderInputToolbar = (props) => {
  if (isConnected) {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  } else {
    return null;
  }
};
const renderCustomActions = (props) => {
  return <CustomActions storage={storage} {...props} />;
};

    const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  return color !== "#757083" ? (
    <LinearGradient colors={[color, color]} style={styles.container}>
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderDay={renderDay}
          renderCustomView={renderCustomView}
           renderActions={renderCustomActions}
        user={{
          _id: userID,
          name
        }}
          accessibilityLabel="chat message"
          accessibilityHint="chat message"
          accessibilityRole="text"

          // ...
        />
      </View>
    </LinearGradient>
  ) : (
    <ImageBackground source={image} resizeMode="cover" style={styles.container}>
      <View style={styles.container}>
        <GiftedChat
  messages={messages}
  onSend={(messages) => onSend(messages)}
  renderBubble={renderBubble}
  renderInputToolbar={renderInputToolbar}
  renderDay={renderDay}
  renderActions={renderCustomActions}
  renderCustomView={renderCustomView}
  user={{
    _id: userId, // use 'userId' instead of 'userID'
    name: route.params.name,
  }}
  accessibilityLabel="chat message"
  accessibilityHint="chat message"
  accessibilityRole="text"
/>
      </View>
    </ImageBackground>
  );
};

export default Chat;
