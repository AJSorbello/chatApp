import { TouchableOpacity, Text, View, StyleSheet, Alert, Linking } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userId }) => {
  const actionSheet = useActionSheet();
  const [location, setLocation] = useState(null);

  const generateReference = (uri) => {
    const timeStamp = (new Date()).getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userId}-${timeStamp}-${imageName}`;
  }

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
    console.log('Permissions:', permissions);

    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      console.log('Image Picker Result:', result);

      if (!result.canceled) {
        await uploadAndSendImage(result.assets[0].uri);
      }
    } else {
      if (!permissions.canAskAgain) {
        Alert.alert(
          "Permission required",
          "This app needs the media library access to pick an image. Please go to settings and grant the permission.",
          [
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
            {
              text: "Cancel",
              onPress: () => console.log("Permission denied"),
              style: "cancel",
            },
          ]
        );
      } else {
        Alert.alert("Permissions haven't been granted.");
      }
    }
  }
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

 useEffect(() => {
    prefetchLocation();
  }, []);

const prefetchLocation = async () => {
  let permissions = await Location.requestForegroundPermissionsAsync();
  if (permissions?.granted) {
    try {
      const locationWatcher = await Location.watchPositionAsync({}, (location) => {
        setLocation(location);
      });
      return () => locationWatcher.remove();
    } catch (error) {
      console.error(error);
      Alert.alert('Error occurred while prefetching location');
    }
  } else {
    Alert.alert('Location permission not granted');
  }
};

const getLocation = async () => {
  try {
    if (location) {
      onSend({
        location: {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        },
      });
    } else {
      throw new Error('Location data is not available');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error occurred while fetching location');
  }
};
  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
            return;
          default:
        }
      }
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 10,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;