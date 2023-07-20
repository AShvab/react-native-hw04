import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen  from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { Feather, Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

const Home = ({navigation}) => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {          
          alignItems: "center",
          height: 60
        },
        tabBarLabelStyle: { display: "none" },
        tabBarActiveTintColor: "orange", 
        tabBarInactiveTintColor: "gray", 
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-grid-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
      onPress={() => navigation.navigate("CreatePostsScreen")}
        name="CreatePost"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="add" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
