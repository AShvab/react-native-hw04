import 'react-native-gesture-handler';

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import Home from "./Screens/Home";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import MapScreen from "./Screens/MapScreen";
import CommentsScreen from './Screens/CommentsScreen';

const MainStack = createStackNavigator(); 

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer >
    <MainStack.Navigator initialRouteName="Login" >
    {/* <MainStack.Navigator initialRouteName="Home" >       */}
      <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <MainStack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
      <MainStack.Screen name="Home" component={Home} options={{ title: "Start screen", headerShown: false }} />
      <MainStack.Screen name="Map" component={MapScreen} options={{ headerShown: false }}/>
      <MainStack.Screen name="Comments" component={CommentsScreen} options={{ headerShown: false }} />      
    </MainStack.Navigator>
    <StatusBar style="auto" />
  </NavigationContainer>
  );
}

