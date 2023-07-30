import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  FlatList,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Background from "../assets/images/backgroundImg.jpg";
import Svg, { Path } from "react-native-svg";
import { Feather, Ionicons } from "@expo/vector-icons";
import { gStyle } from "../styles/style";

import Rectangle1 from "../assets/images/Rectangle1.jpg";
import Rectangle2 from "../assets/images/Rectangle2.jpg";
import Rectangle3 from "../assets/images/Rectangle3.jpg";
import userPhoto from "../assets/images/userPhoto.jpg";

const ProfileScreen = () => {
  const [posts, setPosts] = useState([
    {
      name: "Ліс",
      comments: "8",
      likes: "153",
      location: "Ukraine",
      img: Rectangle1,
      key: "1",
    },
    {
      name: "Захід на Чорному морі",
      comments: "3",
      likes: "200",
      location: "Ukraine",
      img: Rectangle2,
      key: "2",
    },
    {
      name: "8",
      comments: "50",
      likes: "200",
      location: "Italy",
      img: Rectangle3,
      key: "3",
    },
  ]);

  const [login, setLogin] = useState("Natali Romanova");
  const [userPhoto, setUserPhoto] = useState(userPhoto);
  const navigation = useNavigation();

  useEffect(() => {
    setUserPhoto(require("../assets/images/userPhoto.jpg"));
  }, []);

  const handleAvatarButtonPress = async () => {
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
        setUserPhoto({ uri: result.assets[0].uri });
      }
    } catch (error) {
      console.log("Error in handleAvatarButtonPress:", error);
    }
  };

  const handleRemoveImage = () => {
    setUserPhoto(null);
  };

  return (
    <View>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            {userPhoto && (
              <Image
                source={userPhoto}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 16,
                }}
              />
            )}
            {!userPhoto ? (
              <TouchableOpacity
                onPress={handleAvatarButtonPress}
                style={styles.avatarButton}
              >
                <Icon name="plus-circle" size={25} color="#FF6C00" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleRemoveImage}
                style={styles.avatarButton}
              >
                <Icon name="x-circle" size={25} color="#BDBDBD" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.logoutButton}
          >
            <Feather name="log-out" size={24} color={"#BDBDBD"} />
          </TouchableOpacity>

          <Text style={styles.title}>{login}</Text>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Image source={item.img} style={styles.img} />

                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.componentsContainer}>
                  <View
                    style={{ display: "flex", flexDirection: "row", gap: 8 }}
                  >
                    <Svg
                      width="24"
                      height="24"
                      onPress={() => navigation.navigate("Comments", item)}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3 11.5C2.99656 12.8199 3.30493 14.1219 3.9 15.3C5.33904 18.1793 8.28109 19.9988 11.5 20C12.8199 20.0034 14.1219 19.6951 15.3 19.1L21 21L19.1 15.3C19.6951 14.1219 20.0034 12.8199 20 11.5C19.9988 8.28109 18.1793 5.33904 15.3 3.9C14.1219 3.30493 12.8199 2.99656 11.5 3H11C6.68419 3.2381 3.2381 6.68419 3 11V11.5Z"
                        fill="#FF6C00"
                      />
                    </Svg>
                    <Text>{item.comments}</Text>
                  </View>
                  <View
                    style={{ display: "flex", flexDirection: "row", gap: 8 }}
                  >
                    <Feather name="thumbs-up" size={24} color={"#FF6C00"} />
                    <Text>{item.likes}</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      flexDirection: "row",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <Feather name="map-pin" size={24} color={"#BDBDBD"} />
                    <Text
                      style={{
                        textDecorationLine: "underline",
                        marginRight: 8,
                      }}
                    >
                      {item.location}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "75%",
    marginTop: "auto",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: "flex",
    paddingLeft: 16,
    paddingRight: 16,
    position: "relative",
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
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 16,
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
  title: {
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
  },
  img: {
    width: "100%",
    height: 240,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8,
  },
  name: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 10,
  },
  componentsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
    marginBottom: 40,
  },
  location: {
    position: "relative",
    textDecorationLine: "underline",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "right",
    marginBottom: 30,
    color: "#212121",
  },
});

export default ProfileScreen;
