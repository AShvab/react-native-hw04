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
            <TextInput style={styles.inputText} placeholder="Місцевість..." />
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
                        <Text>Видалити</Text>
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
    color: "#BDBDBD",
    fontSize: 16,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  firstInput: {
    marginTop: 30,
  },
  publishButtonContainer: {
    alignItems: "center",
    marginTop: 10,
    paddingLeft:16,
    paddingRight:16,
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
