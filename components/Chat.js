import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, ImageBackground, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, Day, SystemMessage } from "react-native-gifted-chat";
import { addDoc, collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getApps } from 'firebase/app';

const Chat = ({ route, db }) => {
  const [messages, setMessages] = useState([]);
  const image = require('../assets/metalBG.png');
  const { background, userId, name, color } = route.params; // extract userId, name, and color from route params

  const [messageCount, setMessageCount] = useState(0);

 const onSend = useCallback((messages = []) => {
  setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
  
  setMessageCount(prevCount => {
    const newCount = prevCount + 1; // increment the message count

    // if the user has sent 3 messages, send an automatic response
    if (newCount % 3 === 0) {
      setMessages(previousMessages => GiftedChat.append(previousMessages, {
        _id: Math.round(Math.random() * 1000000),
        text: 'Hang on one sec',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Auto Responder',
        },
      }));
    }

    return newCount;
  });
}, []);

  useEffect(() => {
    const messagesCollection = collection(db, "messages");
    const q = query(messagesCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => {
        const firebaseData = doc.data();

        const data = {
          _id: doc.id,
          text: firebaseData.text,
          createdAt: new Date(firebaseData.createdAt.seconds * 1000),
          user: firebaseData.user,
          color: firebaseData.color, // add this line
        };

        return data;
      });

      setMessages(messages);
    });

    return unsubscribe;
  }, []);

const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: '#000', // make the text color of the right bubble black
        },
      }}
      wrapperStyle={{
        right: {
          backgroundColor: '#FFF', // make the background color of the right bubble white
        },
        left: {
          backgroundColor: '#FFF'
        }
      }}
    />
  );
};

  const renderDay = (props) => {
    return <Day {...props} textStyle={{color: 'white'}}/>
  };

  const renderSystemMessage = (props) => {
    return <SystemMessage {...props} textStyle={{color: 'white'}}/>
  };

  return (
    <ImageBackground
      source={background ? null : image}
      resizeMode="cover"
      style={[styles.image, {backgroundColor: color}]}>
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
            _id: userId, // use the userId variable
            name: name, // use the name variable
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  }
});

export default Chat;