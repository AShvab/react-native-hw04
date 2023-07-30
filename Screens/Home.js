import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

import { Feather, Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          alignItems: "center",
          height: 60,
        },
        tabBarLabelStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: () => (
            <Feather name="grid" size={24} color={"rgba(33, 33, 33, 0.8)"} />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: () => (
            <Ionicons
              name="add"
              size={24}
              color={"ffffff"}
              style={styles.addButtonContainer}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Feather name="user" size={24} color={"rgba(33, 33, 33, 0.8)"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  addButtonContainer: {
    height: 40,
    width: 70,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 23,
  },
});

export default Home;
