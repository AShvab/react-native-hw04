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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Feather";

const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleLoginPress = () => {
    console.log("Login pressed");
  };

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

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setUserPhoto(null);
  };

  const onRegistration = () => {
    if (!name || !email || !password) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі поля");
      return;
    }
    console.log(name, email, password);

    Alert.alert(
      "Реєстрація успішна",
      `login: ${name}, email: ${email}, password: ${password}`,
    );
    clearForm();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/backgroundImg.jpg")}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
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
  
        <TouchableOpacity style={styles.button} onPress={onRegistration}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.centerText]}>Вже є акаунт?</Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={[styles.text, styles.linkText]}>Увійти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
  },
  avatarContainer: {
    position: "absolute",
    top: "45%",
    left: "50%",
    marginTop: -60,
    marginLeft: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9,
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
    position: "relative",
    flex: 1,
    height: 549,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  heading: {
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    fontSize: 30,
    marginBottom: 30,
  },
  input: {
    width: 343,
    height: 50,
    padding: 16,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
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
  },

  button: {
    backgroundColor: "#FF6C00",
    width: 343,
    height: 50,
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
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
