import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { gStyle } from "../styles/style";
import Background from "../assets/images/backgroundImg.jpg";

const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigation = useNavigation();

  const handleFocus = (placeholder) => {
    setFocusedInput(placeholder);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const toggleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const handlePlusButtonPress = async () => {
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
        setUserPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error in handlePlusButtonPress:", error);
    }
  };

  const removeUserPhoto = () => {
    setUserPhoto(null);
  };

  const onRegistration = () => {
    if (!name || !email || !password) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі поля");
      return;
    }
    clearForm();
    navigation.navigate("Home");
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setUserPhoto(null);
  };

  return (
    <ImageBackground
      source={Background}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            {userPhoto && (
              <Image source={{ uri: userPhoto }} style={styles.avatarImage} />
            )}
            {!userPhoto ? (
              <TouchableOpacity
                style={styles.avatarButton}
                onPress={handlePlusButtonPress}
              >
                <Icon name="plus-circle" size={25} color="#FF6C00" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.avatarButton}
                onPress={removeUserPhoto}
              >
                <Icon name="x-circle" size={25} color="#BDBDBD" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.heading}>Реєстрація</Text>

            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Логін" && styles.inputFocused,
                ]}
                onFocus={() => handleFocus("Логін")}
                onBlur={handleBlur}
                placeholder="Логін"
                value={name}
                autoComplete="name"
                onChangeText={setName}
              />

              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Адреса електронної пошти" &&
                    styles.inputFocused,
                ]}
                onChangeText={setEmail}
                onFocus={() => handleFocus("Адреса електронної пошти")}
                onBlur={handleBlur}
                autoComplete="email"
                value={email}
                placeholder="Адреса електронної пошти"
              />
              <View style={styles.passwordInputContainer}>
                <TextInput
                  placeholder="Пароль"
                  style={[
                    styles.input,
                    styles.lastInput,
                    focusedInput === "Пароль" && styles.inputFocused,
                  ]}
                  onFocus={() => handleFocus("Пароль")}
                  onBlur={handleBlur}
                  value={password}
                  autoComplete="password"
                  secureTextEntry={!visiblePassword}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={styles.passwordIsShown}
                  onPress={toggleVisiblePassword}
                >
                  <Text style={styles.passwordIsShownText}>
                    {visiblePassword ? "Приховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>

            <TouchableOpacity style={gStyle.button} onPress={onRegistration}>
              <Text style={gStyle.buttonText}>Зареєструватися</Text>
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={[styles.text, styles.centerText]}>
                Вже є акаунт?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={[styles.text, styles.linkText]}>Увійти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "70%",
    marginTop: "auto",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: "flex",
    paddingLeft: 16,
    paddingRight: 16,
  },

  avatarContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarImage: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarButton: {
    position: "absolute",
    bottom: 14,
    right: -14,
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 0,
  },
  formContainer: {
    height: 549,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  heading: {
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    fontSize: 30,
    marginBottom: 40,
    marginTop: 0,
  },
  input: {
    width: "100%",
    height: 50,
    paddingLeft: 16,
    paddingRight: 16,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },
  inputFocused: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },
  lastInput: {
    marginBottom: 0,
  },
  passwordInputContainer: {
    position: "relative",
  },
  passwordIsShown: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  passwordIsShownText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    paddingRight: 5,
  },

  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  text: {
    color: "#1B4371",
    fontSize: 16,
  },
  linkText: {
    marginLeft: 5,
  },
  centerText: {
    textAlign: "center",
  },
});

export default RegistrationScreen;
