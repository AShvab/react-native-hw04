import React, { useState } from "react";

import {
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { gStyle } from "../styles/style";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Tabs = createBottomTabNavigator();

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [postPhoto, setPostPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");

  const handleButtonPress = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Denied",
          "Please enable media library permission to select a photo."
        );
        return;
      }
      const options = {
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
      };
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.canceled) {
        setPostPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error in handlePlusButtonPress:", error);
    }
  };

  const removePostPhoto = () => {
    setPostPhoto(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{}}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={gStyle.screenContainer}>
          <View style={gStyle.headingContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={gStyle.backButton}
            >
              <Feather name="arrow-left" size={24} color={"#212121"} />
            </TouchableOpacity>
            <Text style={gStyle.heading}>Створити публікацію</Text>
          </View>

          <View style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 28 }}>
            <View style={styles.postPhotoContainer}>
              <Image
                source={postPhoto ? { uri: postPhoto } : null}
                style={{
                  width: "100%",
                  height: 240,
                  borderRadius: 8,
                }}
              />
              <TouchableOpacity
                onPress={handleButtonPress}
                style={[
                  styles.addPhotoButton,
                  postPhoto
                    ? {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      }
                    : {},
                ]}
              ></TouchableOpacity>
            </View>
          </View>

          <Text style={styles.text}>Завантажте фото</Text>
          <View style={{ paddingLeft: 16, paddingRight: 16 }}>
            <TextInput
              style={[styles.inputText, styles.firstInput]}
              placeholder="Назва..."
              value={photoName}
              onChangeText={(text) => setPhotoName(text)}
            />
            <TextInput style={styles.inputText} placeholder="Місцевість..." />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backButton: {
    paddingLeft: 10,
  },
  postPhotoContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 8,
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  addPhotoButton: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },
  text: {
    paddingLeft: 16,
    color: "#BDBDBD",
    fontSize: 16,
  },
  inputText: {
    width: "100%",
    height: 50,
    marginTop: 20,
    color: "#BDBDBD",
    fontSize: 16,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  firstInput: {
    marginTop: 30,
  },
});

export default CreatePostsScreen;
