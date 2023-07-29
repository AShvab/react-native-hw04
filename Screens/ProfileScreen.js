import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import Background from "../assets/images/backgroundImg.jpg";

const ProfileScreen = () => {
  return (
    <View>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      ></ImageBackground>
    </View>
  );
};

export default ProfileScreen;
