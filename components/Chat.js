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

const image = require("../assets/metalBG.png"); // make sure this path is correct

const Chat = ({ route, db, navigation, isConnected }) => {
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

  return color !== "#757083" ? (
    <LinearGradient colors={[color, color]} style={styles.container}>
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderDay={renderDay}
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
          accessibilityLabel="chat message"
          accessibilityHint="chat message"
          accessibilityRole="text"
        />
      </View>
    </ImageBackground>
  );
};

export default Chat;
