import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { Feather, Ionicons } from "@expo/vector-icons";
import { gStyle } from "../styles/style";
import { useNavigation } from "@react-navigation/native";

const CommentsScreen = () => {
  const navigation = useNavigation();

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
            <Text style={gStyle.heading}>Коментарі</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;
