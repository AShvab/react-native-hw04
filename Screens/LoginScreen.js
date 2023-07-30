import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { gStyle } from "../styles/style";

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
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

  const handleLoginButtonPress = () => {
    if (!email || !password) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі поля");
      return;
    }
    clearForm();
    navigation.navigate("Home");
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/backgroundImg.jpg")}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Увійти</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
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
          <TouchableOpacity
            style={gStyle.button}
            onPress={handleLoginButtonPress}
          >
            <Text style={gStyle.buttonText}>Увійти</Text>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Немає акаунту?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={[styles.text, styles.linkText]}>
                Зареєструватись
              </Text>
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
  formContainer: {
    position: "relative",
    flex: 1,
    height: "60%",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  heading: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginBottom: 30,
    textAlign: "center",
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
    paddingRight: 5,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  text: {
    color: "#1B4371",
    fontSize: 16,
  },
  linkText: {
    textDecorationLine: "underline",
    marginLeft: 5,
  },
});

export default LoginScreen;
