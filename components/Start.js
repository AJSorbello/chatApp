import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const Start = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
        <Text style={styles.buttonText}>Go to Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const Chat = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Start')}>
        <Text style={styles.buttonText}>Go to Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10, // Add this line
    padding: 10,
  },
});

export { Start, Chat };