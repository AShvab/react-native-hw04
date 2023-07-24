import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { gStyle } from "../styles/style";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

const CreatePostsScreen = () => {
  const navigation = useNavigation();

  return (
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
    </View>
    
  );
};

const styles = StyleSheet.create({
  backButton: {
    paddingLeft: 10,
  },
});

export default CreatePostsScreen;
