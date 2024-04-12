import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble, Day, SystemMessage } from "react-native-gifted-chat";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const image = require('../assets/metalBG.png'); // replace with the path to your image

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,

      },
    ]);
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
            _id: 1
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