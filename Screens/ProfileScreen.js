import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Background from "../assets/images/backgroundImg.jpg";
import Svg, { Circle, Path } from "react-native-svg";
import { Feather, Ionicons } from "@expo/vector-icons";
import { gStyle } from "../styles/style";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
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
      name: "Старий будиночок у Венеції",
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
          {/* <Text style={styles.title}>Natali Romanova</Text> */}
          <Text style={styles.title}>{login}</Text>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Comments", item)}
              >
                <Image source={item.img} style={styles.img} />
                <Text style={styles.name}>{item.name}</Text>

                <Text>{item.comments}</Text>
                <Text>{item.likes}</Text>

                <Feather
                  name="map-pin"
                  size={24}
                  color={"#BDBDBD"}
                  style={styles.mapPin}
                />
                <Text style={styles.location}>{item.location}</Text>

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
    color:"#212121",
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
  },
  //   commentsBlock:{
  // display:"flex",
  // justifyContent:"space-between",
  //   },
  location:{
position:"relative",
textDecorationLine:"underline",
fontFamily: "Roboto-Regular",
fontSize: 16,
textAlign:"right",
marginBottom:30,
color:"#212121",
  },
  mapPin: {
    position: "absolute",
    bottom: 30,
    right: 64,
  },
});

export default ProfileScreen;
