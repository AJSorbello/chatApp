# Mobile Chat App

## **Overview**
The Mobile Chat App is a native chat application designed for various user groups, including friends, family, course students, and developers collaborating on a project. Developed using React Native, the app allows users to communicate in real-time and is accompanied by comprehensive documentation. It is optimized for both Android and iOS devices, built with Expo, and utilizes Google Firestore for message storage. Given the widespread use of mobile chat apps, mastering their development is a valuable skill. This project serves as a demonstration of proficiency in React Native development.

## **Features**
### **User Stories**
- **New User:** Easily join a chat room to start conversing with friends and family.
- **Message Exchange:** Send and receive messages to stay updated with contacts.
- **Image Sharing:** Share images with contacts for visual communication.
- **Location Sharing:** Share current location with others to indicate whereabouts.
- **Offline Access:** Read messages offline to revisit conversations anytime.
- **Accessibility:** Ensure compatibility with screen readers for users with visual impairment.

### **Key Features**
- Page for users to enter their name and choose a background color before joining the chat.
- Conversation display page with input field and submit button.
- Ability to send images and location data.
- Display of location data in a map view within the chat.
- Chat interface and functionality created using the Gifted Chat library.
- Online and offline data storage for chat conversations.

### **Technical Requirements**
- Developed in React Native with Expo.
- Styled according to provided screen design.
- Chat conversations stored in Google Firestore Database.
- User authentication via Google Firebase authentication.
- Local storage for chat conversations.
- Ability for users to pick and send images from phone's library.
- Capability to take pictures with device's camera app and send them.
- Images stored in Firebase Cloud Storage.
- Ability to read user's location data.

## **Setup and Installation**

### **Prerequisites**
- Node.js and npm (Node Package Manager)
- Expo CLI
- Firebase account with Firestore and Firebase Authentication configured


### **Step-by-Step Guide**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mobile-chat-app.git
   cd mobile-chat-app

2. **Install dependencies**
   
npm install


3. **Set up Firebase**
   
- Create a Firebase project on the Firebase Console.
- Add an iOS and Android app to your project.
- Follow the instructions to download the google-services.json (for Android) and GoogleService-Info.plist (for iOS) files and place them in the appropriate locations in your project.
- Enable Firestore Database and Firebase Authentication.

4. **Configure Firebase in your app**

- Create a firebaseConfig.js file in your project's root directory.
- Add your Firebase project configuration details to firebaseConfig.js:

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };



5. **Start the Expo server**
- expo start
```

6. **Run the app on your device or simulator**

- For iOS: Press 'i' to open in iOS simulator (macOS only).

- For Android: Press a to open in Android Emulator, or scan the QR code with the Expo Go app on your Android device.

```

Author
AJ Sorbello

**GitHub Link**: [AJSorbello/chatApp](https://github.com/AJSorbello/chatApp)

License
This project is licensed under the AJ Sorbello License.