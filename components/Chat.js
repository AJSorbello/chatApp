import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, Day, SystemMessage } from "react-native-gifted-chat";
import { addDoc, collection, query, onSnapshot, orderBy } from 'firebase/firestore';

const Chat = ({ route, db }) => { // add route prop here
  const [messages, setMessages] = useState([]);
  const image = require('../assets/metalBG.png'); // replace with the path to your image

  const onSend = (newMessages) => {
    const message = {
      ...newMessages[0],
      user: {
        _id: route.params.userId, // use the userId from route params
        name: route.params.name, // use the name from route params
      },
    };
    addDoc(collection(db, "messages"), message);
  }

  useEffect(() => {
    const messagesCollection = collection(db, "messages");
    const q = query(messagesCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => {
        const firebaseData = doc.data();

        const data = {
          _id: doc.id,
          text: firebaseData.text,
          createdAt: new Date(firebaseData.createdAt.seconds * 1000), // convert to JS date object
          user: firebaseData.user,
        };

        return data;
      });

      setMessages(messages);
    });

    return unsubscribe; // cleanup function
  }, []);

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  const renderDay = (props) => {
    return <Day {...props} textStyle={{color: 'white'}}/>
  };

  const renderSystemMessage = (props) => {
    return <SystemMessage {...props} textStyle={{color: 'white'}}/>
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderDay={renderDay}
          accessible={true}
          accessibilityLabel="Chat"
          accessibilityHint="Start a new chat"
          accessibilityRole="button"
          renderSystemMessage={renderSystemMessage}
          onSend={messages => onSend(messages)}
          user={{
            _id: route.params.userId, // use the userId from route params
            name: route.params.name, // use the name from route params
          }}
        />
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
    justifyContent: 'flex-end',
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent white
    padding: 10,
    borderRadius: 5,
  }
});

export default Chat;