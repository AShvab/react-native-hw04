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
import Svg, { Path, Rect, G, ClipPath, Defs } from "react-native-svg";

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [postPhoto, setPostPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [location, setLocation] = useState("");

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
    setPhotoName("");
    setLocation("");
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
              {/* <Feather
                name="arrow-left"
                size={24}
                color={"rgba(33, 33, 33, 0.8)"}
              /> */}
              <Svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M20 12H4"
                  stroke="#212121"
                  stroke-opacity="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M10 18L4 12L10 6"
                  stroke="#212121"
                  stroke-opacity="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
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
              >
                {/* <Feather name="camera" size={24} color={"#BDBDBD"} /> */}
                <Svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <G clip-path="url(#clip0_36_0)">
                    <Path
                      d="M11.9998 15.2C13.7671 15.2 15.1998 13.7673 15.1998 12C15.1998 10.2327 13.7671 8.79999 11.9998 8.79999C10.2325 8.79999 8.7998 10.2327 8.7998 12C8.7998 13.7673 10.2325 15.2 11.9998 15.2Z"
                      fill="#BDBDBD"
                    />
                    <Path
                      d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z"
                      fill="#BDBDBD"
                    />
                  </G>
                  <Defs>
                    <ClipPath id="clip0_36_0">
                      <Rect width="24" height="24" fill="white" />
                    </ClipPath>
                  </Defs>
                </Svg>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.text}>
            {" "}
            {postPhoto ? "Редагувати фото" : "Завантажте фото"}
          </Text>
          <View style={{ paddingLeft: 16, paddingRight: 16 }}>
            <TextInput
              style={[styles.inputText, styles.firstInput]}
              placeholder="Назва..."
              value={photoName}
              onChangeText={(text) => setPhotoName(text)}
            />

            <Feather
              name="map-pin"
              size={24}
              color={"#BDBDBD"}
              style={styles.mapPin}
            />
            <TextInput
              style={styles.inputTextMap}
              placeholder="Місцевість..."
              value={location}
              onChangeText={(text) => setLocation(text)}
            />
          </View>
          <View style={styles.publishButtonContainer}>
            <TouchableOpacity
              style={[
                gStyle.button,
                postPhoto
                  ? {
                      backgroundColor: "#FF6C00",
                    }
                  : {
                      color: "#BDBDBD",
                      backgroundColor: "#F6F6F6",
                    },
              ]}
              title="Опублікувати"
              disabled={!postPhoto}
            >
              <Text
                style={[
                  gStyle.buttonText,
                  postPhoto
                    ? {
                        backgroundColor: "#FF6C00",
                      }
                    : {
                        color: "#BDBDBD",
                        backgroundColor: "#F6F6F6",
                      },
                ]}
              >
                Опублікувати
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={removePostPhoto}
            style={styles.removePostButton}
          >
            <Feather name="trash-2" size={24} color={"#BDBDBD"} />
          </TouchableOpacity>
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
    fontSize: 16,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  inputTextMap: {
    width: "100%",
    height: 50,
    marginTop: 20,
    paddingLeft: 28,
    fontSize: 16,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    position: "relative",
  },
  mapPin: {
    position: "absolute",
    paddingLeft: 16,
    bottom: 13,
    left: 0,
  },
  firstInput: {
    marginTop: 30,
  },
  publishButtonContainer: {
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  removePostButton: {
    marginTop: 100,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});

export default CreatePostsScreen;
