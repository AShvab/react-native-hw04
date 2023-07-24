import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
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
          tabBarIcon: () => <Feather name="grid" size={24} color={"#212121"} />,
        }}
      />
      <Tabs.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={{
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
          tabBarIcon: () => <Feather name="user" size={24} color={"#212121"} />,
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
